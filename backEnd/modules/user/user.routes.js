import express from 'express';
import {visualizzazionUser,updateUserLogPassword,visualizzazionUserById} from './user.controller.js';
import { verifyToken } from '../../middlewere/auth.middleware.js';


const router = express.Router();


router.get('/',verifyToken,visualizzazionUser);
router.get('/:id',verifyToken,visualizzazionUserById);
router.post('/update-password',verifyToken,updateUserLogPassword);


export default router;