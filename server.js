// server.js
const express = require('express');
require('dotenv').config();
const NewsAPI = require('newsapi');

const newsapi = new NewsAPI(process.env.NEWS_API_KEY);
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

// Endpoint 1: For all top news from India
app.get('/api/news/india', (req, res) => {
  newsapi.v2.topHeadlines({
    country: 'in'
  }).then(response => {
    res.json(response);
  }).catch(error => {
    console.error('Error fetching India news:', error);
    res.status(500).json({ error: 'Failed to fetch news from India.' });
  });
});

// Endpoint 2: For global business and stock market news
app.get('/api/news/global-business', (req, res) => {
  newsapi.v2.topHeadlines({
    q: 'stocks OR "stock market"',
    category: 'business'
  }).then(response => {
    res.json(response);
  }).catch(error => {
    console.error('Error fetching global business news:', error);
    res.status(500).json({ error: 'Failed to fetch global business news.' });
  });
});

app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});
