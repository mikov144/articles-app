// src/components/HomePage.js
import React, { useEffect, useState } from 'react';
import ArticleCard from './ArticleCard';
import { fetchArticles } from '../services/articleService';
import Header from './Header';

const HomePage = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const data = await fetchArticles();
        setArticles(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
    getArticles();
  }, []);

  return (
    <div className="home-page">
      <Header />
      <h1>News Articles</h1>
      <div className="articles-container">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;

