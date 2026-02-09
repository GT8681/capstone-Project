import {getUsers, uploadUserPassword} from './user.service.js';

export const visualizzazionUser = async (req,res) => {
    try {
        
        const user = await getUsers();
        res.json(user)
    } catch (error) {
        res.status(500)
        .json({
            status: 500,
            message: error.message
        })

        
    }
}

export const updateUserLogPassword = async (req,res) =>{
    try {
        console.log("User object:", req.user);
        const {oldPassword,newPassword} = req.body;
        const userId = req.user.id;

        await updateUserLogPassword(userId,oldPassword,newPassword);

        res.status(200).json({message: 'Password aggiornata con successo'})

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}