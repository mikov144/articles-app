// src/components/ArticlePage.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchArticleById } from '../services/articleService';
import CommentSection from './CommentSection';
import Header from './Header';

const ArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getArticle = async () => {
      try {
        const data = await fetchArticleById(id);
        setArticle(data);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };
    getArticle();
  }, [id]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="article-page">
      <Header />
      <h1>{article.title}</h1>
      <img src={article.image} alt={article.title} className="article-page__image" />
      <p>By {article.author.username} on {new Date(article.created).toLocaleDateString()}</p>
      <div className="article-content">{article.content}</div>
      <button onClick={() => navigate('/')} className="back-button">Back to Home</button>
      <CommentSection articleId={id} />
    </div>
  );
};

export default ArticlePage;

