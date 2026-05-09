// Backend: routes/news.route.js
import express from 'express';
import  { getNews } from '../Services/News.Controller.js';

const router = express.Router();

// La rotta sarà: /api/v1/news
router.get('/', getNews);

export default router;
