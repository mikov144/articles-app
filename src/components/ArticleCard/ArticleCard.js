import { ArticleCardWrapper } from './articleCard.styled';
import React from 'react';
import { Link } from 'react-router-dom';


const ArticleCard = ({ article }) => {
  return (
    <ArticleCardWrapper>
      <div className="article-card__image-wrapper">
        <img src={article.image} alt={article.title} className="article-card__image" />
      </div>
      <Link to={`/article/${article.id}`}><h2 className="article-card__title">{article.title}</h2></Link>
      <p className="article-card__username">автор: {article.author.username}</p>
      <p className="article-card__content">{article.content.substring(0, 100)}...</p>
      <Link to={`/article/${article.id}`}><button className="article-card__button">Читать далее</button></Link>
    </ArticleCardWrapper>
  );
};

export default ArticleCard;
