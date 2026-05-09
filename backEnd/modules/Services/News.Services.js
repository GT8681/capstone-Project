import axios from 'axios';

export const fetchSoccerNews = async () => {
    try {
        const API_KEY = '1add5da4453f4c15a3b5fc2ea74e367b'; // Registrati su newsapi.org per averla
        const url = `https://newsapi.org/v2/everything?q=calcio+serie+a&language=it&sortBy=publishedAt&apiKey=${API_KEY}`;
        
        const response = await axios.get(url);
        // Restituiamo solo gli articoli (ne prendiamo 6 per iniziare)
        return response.data.articles.slice(0, 6);
    } catch (error) {
        console.error("Errore nel Service News:", error);
        throw new Error("Impossibile recuperare le notizie");
    }
};