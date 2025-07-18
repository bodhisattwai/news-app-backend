// server.js
const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

const fetchNews = async (url, res) => {
    try {
        const apiResponse = await fetch(url);
        const newsData = await apiResponse.json();
        if (newsData.status === 'error') {
            console.error('NewsAPI Error:', newsData.message);
            return res.status(500).json({ error: newsData.message });
        }
        res.json(newsData);
    } catch (error) {
        console.error('Server Fetch Error:', error);
        res.status(500).json({ error: 'Failed to fetch news data.' });
    }
};

app.get('/api/news/india', (req, res) => {
    const API_KEY = process.env.NEWS_API_KEY;
    const query = 'business OR technology OR AI OR "current affairs"';
    const url = `https://newsapi.org/v2/top-headlines?country=in&q=${encodeURIComponent(query)}&apiKey=${API_KEY}`;
    fetchNews(url, res);
});

app.get('/api/news/global-business', (req, res) => {
    const API_KEY = process.env.NEWS_API_KEY;
    const query = 'stocks OR "stock market"';
    const url = `https://newsapi.org/v2/top-headlines?category=business&q=${encodeURIComponent(query)}&apiKey=${API_KEY}`;
    fetchNews(url, res);
});

app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});
