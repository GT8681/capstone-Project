import express from 'express';
import {getPlayers,createPlayers,patchPlayer,deleteOnePlayer,findPlayerRole,playerById} from './player.controller.js';
import { uploadCloud } from '../../middlewere/cloudinary.config.js';
import { verifyToken } from '../../middlewere/auth.middleware.js';


const router = express.Router();


router.get('/',getPlayers);
router.get('/:id',playerById);
router.get('/findRole',findPlayerRole);
router.post('/add',verifyToken,uploadCloud.single('foto'),createPlayers);
router.patch('/:id',patchPlayer);
router.delete('/:id',deleteOnePlayer);



export default router;