import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findUserByEmail,createUser } from './auth.service.js';

export const register = async (req, res) => {
    try {

        const { name, surname, email, password,role} = req.body;
        const userExists = await findUserByEmail(email);
        
        //controllo se esiste email
        if(userExists){
            return res.status(409).json({maessage: 'email gia esistente'})
          }
         //Hash della password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
           //salviamo nuovo utente
        const newUser = await createUser({
            name,
            surname,
            email,
            password: hashedPassword,
            role: 'user'
        });
        await newUser.save();
        res.status(201).json({
            message: 'Utente registrato correttamente!!!' + role
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
       
         const user = await findUserByEmail(email);
         if(!user){
            return res.status(404).json({message:'credenziali sbagliate'});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Email o Password sbagliata' });
        }
        const token = jwt.sign({ id: user._id},process.env.CHIAVE_JWT, 
             { expiresIn: '1d' });


        res.json({
            token,
            user: {
                name: user.name,
                surname: user.surname,
                role: user.role,
                email: user.email

            }
        })
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}


