import styles from './articleCard.module.css'
import React from 'react';
import { Link } from 'react-router-dom';


const ArticleCard = ({ article }) => {
  return (
    <div className="article-card">
      <img src={article.image} alt={article.title} className="article-card__image" />
      <h2>{article.title}</h2>
      <p>{article.author.username}</p>
      <p>{article.content.substring(0, 100)}...</p>
      <Link to={`/article/${article.id}`}>Read more</Link>
    </div>
  );
};

export default ArticleCard;
