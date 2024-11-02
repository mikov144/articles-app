// src/components/CreateArticlePage.js
import React from 'react';
import Header from '../../components/Header/Header';
import CreateArticleForm from '../../components/CreateArticleForm/CreateArticleForm';
import { useNavigate } from 'react-router-dom'

const CreateArticlePage = () => {
  const navigate = useNavigate();

  const handleArticleCreated = () => {
    // You can perform actions after an article is created, such as redirecting to the home page or showing a success message.
    console.log('Article created successfully!');
    navigate('/');
  };

  return (
    <div className="create-article-page">
      <Header />
      <CreateArticleForm onArticleCreated={handleArticleCreated} />
    </div>
  );
};

export default CreateArticlePage;
