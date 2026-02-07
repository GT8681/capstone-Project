import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {initDatabaseConnection} from './database/index.js';
import playerRoutes from './modules/player/player.routes.js';

dotenv.config();

const app = express();
const PORT = 4545;


initDatabaseConnection();


app.use(cors());
app.use(express.json());



app.use('/players',playerRoutes);




app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`);
})


