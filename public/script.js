// public/script.js
document.addEventListener('DOMContentLoaded', () => {
    const newsContainer = document.getElementById('news-container');
    
    // --- IMPORTANT: REPLACE WITH YOUR LIVE RENDER URL ---
    const RENDER_URL = 'https://bodhi-news-server.onrender.com';

    const renderArticles = (articles, sectionTitle) => {
        if (!articles || articles.length === 0) return;

        const titleEl = document.createElement('h2');
        titleEl.className = 'section-title';
        titleEl.textContent = sectionTitle;
        newsContainer.appendChild(titleEl);

        articles.forEach(article => {
            if (!article.title || !article.description) return;
            const articleEl = document.createElement('div');
            articleEl.classList.add('article');
            const imageUrl = article.urlToImage || 'https://via.placeholder.com/800x400.png?text=News';
            articleEl.innerHTML = `
                <img src="${imageUrl}" alt="${article.title}" class="article-img">
                <h3>${article.title}</h3>
                <p>${article.description}</p>
                <a href="${article.url}" target="_blank">Read Full Article</a>
            `;
            newsContainer.appendChild(articleEl);
        });
    };

    const fetchNewsFrom = async (endpoint) => {
        try {
            const response = await fetch(endpoint);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            return data.articles || [];
        } catch (error) {
            console.error(`Error fetching from ${endpoint}:`, error);
            return [];
        }
    };

    const loadAllNews = async () => {
        newsContainer.innerHTML = '<p>Loading news...</p>';
        
        // --- These URLs combine your Render URL with the backend routes ---
        const [indiaNews, globalNews] = await Promise.all([
            fetchNewsFrom(`${RENDER_URL}/api/news/india`),
            fetchNewsFrom(`${RENDER_URL}/api/news/global-business`)
        ]);
        
        newsContainer.innerHTML = '';
        renderArticles(indiaNews, 'Top News from India');
        renderArticles(globalNews, 'Global Business & Stocks');
        if (indiaNews.length === 0 && globalNews.length === 0) {
            newsContainer.innerHTML = '<p>Sorry, we could not load any news. Please try again later.</p>';
        }
    };

    loadAllNews();
});
