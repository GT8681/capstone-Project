import express from 'express';
import {visualizzazionUser,updateUserLogPassword,visualizzazionUserById,updateFavoritesController,handleFavorite,getFavorites} from './user.controller.js';
import { verifyToken } from '../../middlewere/auth.middleware.js';


const router = express.Router();


router.get('/',verifyToken,visualizzazionUser);
router.get('/me',verifyToken,visualizzazionUserById);
router.get('/favorites',verifyToken,getFavorites);
router.get('/:id',verifyToken,visualizzazionUserById);
router.post('/update-password',verifyToken,updateUserLogPassword);
router.put('/favorites/:playerId',verifyToken,updateFavoritesController);
router.put('/favoritesList/:playerId',verifyToken,handleFavorite);




export default router;