document.addEventListener('DOMContentLoaded', () => {
    const newsContainer = document.getElementById('news-container');
    
    // The public URL of your backend server on Render.
    const RENDER_URL = 'https://bodhi-news-server.onrender.com';

    /**
     * Creates HTML for each article and adds it to the page under a title.
     * @param {Array} articles - The array of news articles from the API.
     * @param {string} sectionTitle - The heading to display for this section.
     */
    const renderArticles = (articles, sectionTitle) => {
        if (!articles || articles.length === 0) return; // Skip if no articles

        const titleEl = document.createElement('h2');
        titleEl.className = 'section-title';
        titleEl.textContent = sectionTitle;
        newsContainer.appendChild(titleEl);

        articles.forEach(article => {
            // Skip articles that don't have a title or description
            if (!article.title || !article.description) return;

            const articleEl = document.createElement('div');
            articleEl.classList.add('article');
            
            // Use a placeholder if an image is missing
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

    /**
     * Fetches news data from a given API endpoint.
     * @param {string} endpoint - The full URL of the API endpoint.
     * @returns {Promise<Array>} A promise that resolves to an array of articles.
     */
    const fetchNewsFrom = async (endpoint) => {
        try {
            const response = await fetch(endpoint);
            if (!response.ok) {
                // If the server responds with an error (e.g., 404, 500)
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.articles || []; // Return articles or an empty array
        } catch (error) {
            console.error(`Error fetching from ${endpoint}:`, error);
            return []; // Return an empty array on network failure
        }
    };

    /**
     * Main function to load all news sources and render them.
     */
    const loadAllNews = async () => {
        newsContainer.innerHTML = '<p>Loading news...</p>';
        
        // Fetch from both endpoints at the same time
        const [indiaNews, globalNews] = await Promise.all([
            fetchNewsFrom(`${RENDER_URL}/api/news/india`),
            fetchNewsFrom(`${RENDER_URL}/api/news/global-business`)
        ]);
        
        newsContainer.innerHTML = ''; // Clear the "Loading..." text
        
        // Render each section to the page
        renderArticles(indiaNews, 'Top News from India');
        renderArticles(globalNews, 'Global Business & Stocks');
        
        // Display an error if both requests failed or returned no articles
        if (indiaNews.length === 0 && globalNews.length === 0) {
            newsContainer.innerHTML = '<p>Sorry, we could not load any news. Please try again later.</p>';
        }
    };

    // Start the process
    loadAllNews();
});
