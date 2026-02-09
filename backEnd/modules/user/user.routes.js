import express from 'express';
import {visualizzazionUser,updateUserLogPassword} from './user.controller.js';
import { verifyToken } from '../../middlewere/auth.middleware.js';


const router = express.Router();


router.get('/',verifyToken,visualizzazionUser);
router.post('/update-password',verifyToken,updateUserLogPassword);


export default router;