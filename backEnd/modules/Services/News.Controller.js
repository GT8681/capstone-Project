// Backend: controllers/news.controller.js
import {fetchSoccerNews} from '../Services/News.Services.js';

export  const getNews = async (req, res) => {
    try {
        const news = await fetchSoccerNews();
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
