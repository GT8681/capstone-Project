import express from 'express';
import {getPlayers,createPlayers,patchPlayer,deleteOnePlayer,findPlayerRole,playerById, getMyPlayers,getPlayersNationality} from './player.controller.js';
import { uploadCloud } from '../../middlewere/cloudinary.config.js';
import { verifyToken } from '../../middlewere/auth.middleware.js';
import {isPartner} from '../../middlewere/controllerAuth.js'


const router = express.Router();

router.get('/nationality/:nationality',getPlayersNationality);
router.get('/',getPlayers);
router.get('/my-players',verifyToken,getMyPlayers);
router.get('/:id',verifyToken,playerById);
router.get('/findRole',findPlayerRole);
router.post('/add',verifyToken,isPartner,uploadCloud.single('foto'),createPlayers);
router.patch('/:id',patchPlayer);
router.delete('/:id',verifyToken,isPartner,deleteOnePlayer);



export default router;