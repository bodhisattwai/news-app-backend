// server.js
const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

<<<<<<< HEAD
// Helper function for making API requests
=======
// Helper function to handle API requests
>>>>>>> 2a734818fb2147303d1415600dc14eb205a9ddad
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

<<<<<<< HEAD
// --- Backend Route 1 ---
app.get('/api/news/india', (req, res) => {
    const API_KEY = process.env.NEWS_API_KEY;
=======
// Endpoint 1: For all top news from India (including specific topics)
app.get('/api/news/india', (req, res) => {
    const API_KEY = process.env.NEWS_API_KEY;
    // The 'q' parameter searches for these keywords in the headlines and content
>>>>>>> 2a734818fb2147303d1415600dc14eb205a9ddad
    const query = 'business OR technology OR AI OR "current affairs"';
    const url = `https://newsapi.org/v2/top-headlines?country=in&q=${encodeURIComponent(query)}&apiKey=${API_KEY}`;
    fetchNews(url, res);
});

<<<<<<< HEAD
// --- Backend Route 2 ---
app.get('/api/news/global-business', (req, res) => {
    const API_KEY = process.env.NEWS_API_KEY;
=======
// Endpoint 2: For global business and stock market news
app.get('/api/news/global-business', (req, res) => {
    const API_KEY = process.env.NEWS_API_KEY;
    // We specify the 'business' category and add keywords for stocks
>>>>>>> 2a734818fb2147303d1415600dc14eb205a9ddad
    const query = 'stocks OR "stock market"';
    const url = `https://newsapi.org/v2/top-headlines?category=business&q=${encodeURIComponent(query)}&apiKey=${API_KEY}`;
    fetchNews(url, res);
});

app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});
