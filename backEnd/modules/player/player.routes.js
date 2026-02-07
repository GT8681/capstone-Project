import express from 'express';
import {getPlayers,createPlayers,patchPlayer,deleteOnePlayer,findPlayerRole} from './player.controller.js';


const router = express.Router();


router.get('/',getPlayers);
router.get('/findRole',findPlayerRole);
router.post('/add',createPlayers);
router.patch('/:id',patchPlayer);
router.delete('/:id',deleteOnePlayer);



export default router;