// src/pages/CreateArticlePage/CreateArticlePage.js
import React from 'react';
import CreateArticleForm from '../../components/CreateArticleForm/CreateArticleForm';
import { useNavigate } from 'react-router-dom'
import { CreateArticlePageWrapper } from './createArticlePage.styled';

const CreateArticlePage = () => {
  const navigate = useNavigate();

  const handleArticleCreated = () => {
    // You can perform actions after an article is created, such as redirecting to the home page or showing a success message.
    console.log('Article created successfully!');
    navigate('/');
  };

  return (
    <CreateArticlePageWrapper>
      <CreateArticleForm onArticleCreated={handleArticleCreated} />
    </CreateArticlePageWrapper>
  );
};

export default CreateArticlePage;
