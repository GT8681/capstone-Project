import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../user/user.model.js';
import nodemailer from 'nodemailer';
import {findUserByEmail} from './auth.service.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});


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
    //  Opzioni Email
    const mailOptions = {
      from: `"Scouting App ⚽️" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Benvenuto nel Team di Scouting! 🏆",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden;">
          <div style="background-color: #2c3e50; padding: 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0;">SCOUTING APP</h1>
          </div>
          <div style="padding: 30px; line-height: 1.6; color: #333;">
            <h2 style="color: #2c3e50;">Ciao ${name},</h2>
            <p>Siamo entusiasti di averti a bordo! La tua registrazione come <strong>${role}</strong> è stata confermata con successo.</p>
            <p>Da oggi puoi iniziare a monitorare i migliori talenti, gestire la tua squadra e scalare le classifiche del campionato.</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://progetto-di-laurea-puce-sigma.vercel.app/login" 
                 style="background-color: #27ae60; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                 ACCEDI ALLA DASHBOARD
              </a>
            </div>
            
            <p>Se hai domande, rispondi pure a questa email. In bocca al lupo per la tua stagione!</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="font-size: 12px; color: #777;">Ricevi questa mail perché ti sei registrato su Scouting App. Se non sei stato tu, ignora pure questo messaggio.</p>
          </div>
        </div>
      `    
    };
 
   transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
        console.error("❌ Errore Nodemailer:", err);
      } else {
        console.log("📧 Email inviata correttamente!" + info);
      }
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


