// script.js
document.addEventListener('DOMContentLoaded', () => {
    const newsContainer = document.getElementById('news-container');

    // Fetch news from our backend API
    fetch('/api/news')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.status === "error") {
                newsContainer.innerHTML = `<p>Error fetching news: ${data.message}</p>`;
                return;
            }
            
            const articles = data.articles;
            if (!articles || articles.length === 0) {
                newsContainer.innerHTML = '<p>No news articles found.</p>';
                return;
            }

            // Clear any loading text
            newsContainer.innerHTML = ''; 

            // Create and append each article card
            articles.forEach(article => {
                // Skip articles without a title or description
                if (!article.title || !article.description) {
                    return;
                }

                const articleEl = document.createElement('div');
                articleEl.classList.add('article');

                // Using a placeholder for missing images improves the look
                const imageUrl = article.urlToImage ? article.urlToImage : 'https://via.placeholder.com/800x400.png?text=News';

                articleEl.innerHTML = `
                    <img src="${imageUrl}" alt="${article.title}" class="article-img">
                    <h2>${article.title}</h2>
                    <p>${article.description}</p>
                    <a href="${article.url}" target="_blank">Read Full Article</a>
                `;
                newsContainer.appendChild(articleEl);
            });
        })
        .catch(error => {
            console.error('Fetch error:', error);
            newsContainer.innerHTML = '<p>Sorry, we could not load the news. Please try again later.</p>';
        });
});