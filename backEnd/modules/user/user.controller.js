import { getUsers, uploadUserPassword,getUserById,toggleFavoriteService,toggleFavoriteServiceList,getFavoritePlayersService} from './user.service.js';

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

export const updateFavoritesController = async (req,res) =>{
    try {
        const userId = req.user.id;
        const {playerId} = req.params;
        
        const updateUser = await toggleFavoriteService(userId,playerId);

        res.status(200).json({
            message: updateUser.favorites
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message || "Errore durante l'aggiornamento dei preferiti"
        })
        
    }
    
}

export const handleFavorite = async (req, res) => {
    try {
      // req.user.id arriva dal tuo middleware di autenticazione (il token)
      const updatedFavorites = await toggleFavoriteServiceList(req.user.id, req.params.playerId);
      res.status(200).send(updatedFavorites);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  export const getFavorites = async (req, res) => {
    try {
      const favorites = await getFavoritePlayersService(req.user.id);
      res.status(200).send(favorites);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };
  
  