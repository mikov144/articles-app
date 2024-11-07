import React from 'react';
import CreateArticleForm from '../../components/CreateArticleForm/CreateArticleForm';
import { useNavigate } from 'react-router-dom'

const CreateArticlePage = () => {
  const navigate = useNavigate();

  const handleArticleCreated = () => {
    console.log('Article created successfully!');
    navigate('/');
  };

  return (
    <div>
      <CreateArticleForm onArticleCreated={handleArticleCreated} />
    </div>
  );
};

export default CreateArticlePage;
