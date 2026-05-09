import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {initDatabaseConnection} from './database/index.js';
import playerRoutes from './modules/player/player.routes.js';
import authRoutes from './modules/auth/auth.routes.js';
import usersRoutes from './modules/user/user.routes.js';
import newsRouter from './modules/Services/News.Routes.js';

dotenv.config();

const app = express();
const PORT = 4545;


initDatabaseConnection();


app.use(cors({
  origin: true,
  credentials: true
}));


//app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit:'50mb', extended:true}));


app.use('/players',playerRoutes);
app.use('/auth',authRoutes);
app.use('/users',usersRoutes);
app.use('/api/v1/news', newsRouter);


app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`);
})


