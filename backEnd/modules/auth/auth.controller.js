import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../user/user.model.js';
import {findUserByEmail} from './auth.service.js';
import { Resend } from 'resend';

const Resend = new Resend(process.env.RESEND_API_KEY);

export const register = async (req, res) => {
   
  try {
    const { name, surname, email, password, role } = req.body;

    // Controllo se esiste già
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: "L'email è già registrata" });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creazione Utente
    const newUser = await User.create({
      name,
      surname,
      email,
      password: hashedPassword,
      role: role || 'PatnerPro'
    });
    resend.emails.send({
      from: 'onboarding@resend.dev', // Per ora usa questa, è quella di test gratuita
      to: newUser.email,
      subject: 'Benvenuto nella Scouting App! ⚽️',
      html: `<strong>Ciao ${newUser.name}!</strong> La tua registrazione è andata a buon fine.`
    }).then(() => {
      console.log("✅ Mail inviata con Resend!");
    }).catch((err) => {
      console.log("❌ Errore Resend:", err.message);
    });
   
    return res.status(201).json({
      success: true,
      message: "Registrazione completata!",
      user: newUser
    });
  } catch (error) {
    console.error("💥 Errore fatale registro:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'credenziali sbagliate' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Email o Password sbagliata' });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.CHIAVE_JWT,
            { expiresIn: '1d' });


        res.json({
            token,
            user: {
                name: user.name,
                surname: user.surname,
                email: user.email,
                role: user.role,


            }
        })
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}


