import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../user/user.model.js';
import {findUserByEmail} from './auth.service.js';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Benvenuto nel Team Scouting! ⚽️',
      html: `
        <div style="background-color: #f4f7f6; padding: 50px 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
            
            <div style="background-color: #28a745; padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; text-transform: uppercase; letter-spacing: 2px;">Scouting App</h1>
            </div>
    
            <div style="padding: 40px; color: #333333; line-height: 1.6;">
              <h2 style="color: #1a1a1a;">Ciao ${name}, benvenuto a bordo!</h2>
              <p style="font-size: 16px;">Siamo felici di averti nel nostro team di scouting. La tua registrazione è stata completata con successo e il tuo account è ora <strong>attivo</strong>.</p>
              
              <div style="background-color: #f8f9fa; border-left: 4px solid #28a745; padding: 15px; margin: 25px 0;">
                <p style="margin: 0; font-size: 14px; color: #555;">Puoi iniziare subito a monitorare i talenti, creare report e gestire le tue liste giocatori dalla tua dashboard personale.</p>
              </div>
    
              <div style="text-align: center; margin-top: 35px;">
                <a href="https://capstone-project-puce-sigma.vercel.app/login" 
                   style="background-color: #28a745; color: #ffffff; padding: 15px 35px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; transition: background 0.3s;">
                   ACCEDI ALLA DASHBOARD
                </a>
              </div>
            </div>
    
            <div style="background-color: #1a1a1a; padding: 20px; text-align: center; color: #777777; font-size: 12px;">
              <p style="margin: 5px 0;">© 2026 Scouting App - Progetto di Laurea</p>
              <p style="margin: 5px 0;">Hai ricevuto questa email perché ti sei registrato alla nostra piattaforma.</p>
            </div>
          </div>
        </div>
      `
    }).then(() => console.log("✅ Email Premium inviata!"))
      .catch((err) => console.error("❌ Errore:", err.message));
   
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


