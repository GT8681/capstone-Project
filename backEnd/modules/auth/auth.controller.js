import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findUserByEmail, } from './auth.service.js';
import User from '../user/user.model.js';
import nodemailer from 'nodemailer'; 

export const register = async (req, res) => {
    try {
        const { name, surname, email, password, role } = req.body;

        const userExists = await User.findOne({email});
        if (userExists) {
        return res.status(409).json({ message: "L'email è già registrata" });
  }
    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({
            name,
            surname,
            email,
            password:hashedPassword,
            role: role || 'PatnerPro'
        });

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: newUser.email,
            subject: 'Benvenuto nella Scouting App! ⚽️',
            html: `<h1>Ciao ${newUser.name}!</h1><p>Registrazione ok.</p>`
        };
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) console.log("Errore email:", err.message);
            else console.log("Email inviata!");
        });
        return res.status(201).json({ 
            success: true, 
            message: "Registrazione completata!" 
        });

    } catch (error) {
        console.error("Errore fatale:", error);
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


