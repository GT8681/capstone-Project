import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../user/user.model.js';
import nodemailer from 'nodemailer';


// 1. Configurazione Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const register = async (req, res) => {
    console.log("-----------------------------------------");
    console.log("🚨 CHIAMATA ARRIVATA AL BACKEND! 🚨");
    console.log("Dati ricevuti:", req.body);
    console.log("-----------------------------------------");
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

    console.log("✅ Utente creato, preparo email per:", email);

    // 2. Opzioni Email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Benvenuto nella Scouting App! ⚽️",
      html: `<h1>Ciao ${name}!</h1><p>La tua registrazione è confermata.</p>`
    };

    // 3. INVIO EMAIL (Senza await per non bloccare la risposta)
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("❌ Errore Nodemailer:", err.message);
      } else {
        console.log("📧 Email inviata correttamente!");
      }
    });

    // 4. Risposta immediata al Frontend
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


