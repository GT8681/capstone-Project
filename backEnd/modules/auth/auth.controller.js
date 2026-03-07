import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findUserByEmail, createUser } from './auth.service.js';
import { sendWelcomeEmail } from '../../services/mail.service.js';

export const register = async (req, res) => {
    try {
        const { name, surname, email, password, role } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email obbligatoria!" });
        }
        const userExists = await findUserByEmail(email);
        if (userExists) {
            return res.status(409).json({ maessage: 'email gia esistente' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await createUser({
            name,
            surname,
            email,
            password: hashedPassword,
            role: role || 'PatnerPro'
        });
        res.status(201).json({
            message: 'Utente registrato correttamente!!!',
            user: newUser
        });
        sendWelcomeEmail(email, name).catch(err => console.error("Errore mail:", err));

    } catch (error) {
        console.error("Errore registrazione:", error);
        res.status(500).json({ message: error.message });
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


