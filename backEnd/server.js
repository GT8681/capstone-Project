import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {initDatabaseConnection} from './database/index.js';
import playerRoutes from './modules/player/player.routes.js';
import authRoutes from './modules/auth/auth.routes.js';
import usersRoutes from './modules/user/user.routes.js';

dotenv.config();

const app = express();
const PORT = 4545;


initDatabaseConnection();


const corsOptions = {
    origin: [
      'https://capstone-project-puce-sigma.vercel.app',
      'https://capstone-project-git-main-gt8681s-projects.vercel.app',  
      'https://capstone-project-9y0b0e9hj-gt8681s-projects.vercel.app'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
  };
  
  app.use(cors(corsOptions));
  

//app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit:'50mb', extended:true}));


app.use('/players',playerRoutes);
app.use('/auth',authRoutes);
app.use('/users',usersRoutes);


app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`);
})


