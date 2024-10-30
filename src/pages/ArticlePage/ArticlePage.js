import { ArticlePageWrapper } from './articlePage.styled';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchArticleById } from '../../services/articleService';
import CommentSection from '../../components/CommentSection/CommentSection';
import Header from '../../components/Header/Header';

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
    <ArticlePageWrapper>
      <Header />
      <div className='article__inner'>
        <h1>{article.title}</h1>
        <img src={article.image} alt={article.title} className="article-page__image" />
        <p>By {article.author.username} on {new Date(article.created).toLocaleDateString()}</p>
        <div className="article-content">{article.content}</div>
        <button onClick={() => navigate('/')} className="back-button">Back to Home</button>
      </div>
      <CommentSection articleId={id} />
    </ArticlePageWrapper>
  );
};

export default ArticlePage;

