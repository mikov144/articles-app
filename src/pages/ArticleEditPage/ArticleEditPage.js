// src/pages/ArticleEditPage/ArticleEditPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchArticleById } from '../../services/articleService';
import { editArticle, deleteArticle } from '../../services/authService';
import Header from '../../components/Header/Header';
import { Loader } from '../../components/Loader/Loader';
import { ArticleEditPageWrapper } from './articleEditPage.styled';

const ArticleEditPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getArticle = async () => {
      try {
        const data = await fetchArticleById(id);
        setTitle(data.title);
        setContent(data.content);
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    };
    getArticle();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }

    try {
      await editArticle(id, formData);
      navigate(`/article/${id}`);
    } catch (err) {
      setError('Failed to edit article. Please try again.');
      console.error('Error editing article:', err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteArticle(id);
      navigate('/');
    } catch (err) {
      setError('Failed to delete article. Please try again.');
      console.error('Error deleting article:', err);
    }
  };

  if (loading) {
    return (
      <ArticleEditPageWrapper>
        <Header />
        <Loader />
      </ArticleEditPageWrapper>
    );
  }

  return (
    <ArticleEditPageWrapper>
      <Header />
      <h1>Edit Article</h1>
      <form onSubmit={handleSubmit} className="edit-article-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Save Changes</button>
        <button type="button" onClick={handleDelete}>Delete Article</button>
      </form>
    </ArticleEditPageWrapper>
  );
};

export default ArticleEditPage;

