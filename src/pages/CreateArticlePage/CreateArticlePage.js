// src/components/CreateArticlePage.js
import React from 'react';
import Header from '../../components/Header/Header';
import CreateArticleForm from '../../components/CreateArticleForm/CreateArticleForm';

const CreateArticlePage = () => {
  return (
    <div className="create-article-page">
      <Header />
      <h1>Create New Article</h1>
      <CreateArticleForm />
    </div>
  );
};

export default CreateArticlePage;
