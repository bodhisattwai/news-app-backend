// server.js

// 1. Import necessary packages
const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config(); // This loads the .env file

const app = express();
const PORT = process.env.PORT || 3000;

// 2. Serve your frontend files (from the 'public' folder)
app.use(express.static('public'));

// 3. Create an API endpoint to get the news
app.get('/api/news', async (req, res) => {
    // Get the API key safely from your .env file
    const API_KEY = process.env.NEWS_API_KEY;

    // Check if the API key is missing
    if (!API_KEY) {
        return res.status(500).json({ error: 'API key is missing. Make sure it is in your .env file.' });
    }

    // The URL to fetch top headlines from the USA
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

    try {
        const apiResponse = await fetch(url);
        const newsData = await apiResponse.json();
        res.json(newsData);
    } catch (error) {
        console.error('Error fetching from NewsAPI:', error);
        res.status(500).json({ error: 'Failed to fetch news data.' });
    }
});

// 4. Start the server
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});
