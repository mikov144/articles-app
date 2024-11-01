import { HomePageWrapper } from './homePage.styled';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ArticleCard from '../../components/ArticleCard/ArticleCard';
import { fetchArticles } from '../../services/articleService';
import Header from '../../components/Header/Header';
import { Loader } from '../../components/Loader/Loader';

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const data = await fetchArticles();
        setArticles(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };
    getArticles();
  }, []);

  return (
    <HomePageWrapper>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Link to="/create-article" className="create-article-link">Create New Article</Link>
          <div className="articles-container">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </>
      )}
    </HomePageWrapper>
  );
};

export default HomePage;
