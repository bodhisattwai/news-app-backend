// server.js
const express = require('express');
const fetch = require('node-fetch'); // We're using node-fetch directly
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

// Endpoint 1: For all top news from India
app.get('/api/news/india', async (req, res) => {
  const API_KEY = process.env.NEWS_API_KEY;

  // Manually build the URL for the API request
  const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${API_KEY}`;

  try {
    const apiResponse = await fetch(url);
    const newsData = await apiResponse.json();
    res.json(newsData);
  } catch (error) {
    console.error('Error fetching India news:', error);
    res.status(500).json({ error: 'Failed to fetch news from India.' });
  }
});

// Endpoint 2: For global business and stock market news
app.get('/api/news/global-business', async (req, res) => {
  const API_KEY = process.env.NEWS_API_KEY;
  const query = 'stocks OR "stock market"';

  // Manually build the URL for the API request
  const url = `https://newsapi.org/v2/top-headlines?category=business&q=${encodeURIComponent(query)}&apiKey=${API_KEY}`;
  
  try {
    const apiResponse = await fetch(url);
    const newsData = await apiResponse.json();
    res.json(newsData);
  } catch (error) {
    console.error('Error fetching global business news:', error);
    res.status(500).json({ error: 'Failed to fetch global business news.' });
  }
});

app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});
