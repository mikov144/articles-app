//src/pages/ArticlePage/ArticlePage.js
import { ArticlePageWrapper } from './articlePage.styled';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchArticleById } from '../../services/articleService';
import { getCurrentUser } from '../../services/authService';
import CommentSection from '../../components/CommentSection/CommentSection';
import Header from '../../components/Header/Header';
import { Loader } from '../../components/Loader/Loader';


const ArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const username = getCurrentUser();

  useEffect(() => {
    const getArticle = async () => {
      try {
        const data = await fetchArticleById(id);
        setArticle(data);
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    };
    getArticle();
  }, [id]);

  if (loading) {
    return (
      <ArticlePageWrapper>
        <Header />
        <Loader />
      </ArticlePageWrapper>
    );
  }

  const isAuthor = article.author.username === username;

  return (
    <ArticlePageWrapper>
      <Header />
      <div className='article-inner'>
        <h1 className='article-inner__title'>{article.title}</h1>
        <img src={article.image} alt={article.title} className="article-inner__image" />
        <p className='article-inner__author'>автор: {article.author.username} от {new Date(article.created).toLocaleDateString("ru-RU")}</p>
        <div className='article-inner__content'>{article.content}</div>
        <div className='buttons-wrapper'>
          {isAuthor && (
            <>
              <button onClick={() => navigate(`/edit-article/${id}`)} className='buttons-wrapper__button'>Редактировать статью</button>
            </>
          )}
          <button onClick={() => navigate('/')} className='buttons-wrapper__button'>На главную страницу</button>
        </div>
      </div>
      <CommentSection articleId={id} />
    </ArticlePageWrapper>
  );
};

export default ArticlePage;


