import { getUsers, uploadUserPassword,getUserById } from './user.service.js';

export const visualizzazionUser = async (req, res) => {
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

export const updateUserLogPassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const userId = req.user.id;
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });

        }
        await uploadUserPassword(userId, oldPassword, newPassword);
        res.status(200).json({ message: 'Password aggiornata con successo' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const visualizzazionUserById = async (req, res) => {
    try {
        const userId = req.params.id || req.user.id;
        const user = await getUserById(userId)
        if (!user) {
            return res.status(404).json({ message: 'Utente non trovato' });
        }
        res.json(user)
        
    } catch (error) {
         res.status(500)
            .json({
                status: 500,
                message: error.message
            })
        
    }
}