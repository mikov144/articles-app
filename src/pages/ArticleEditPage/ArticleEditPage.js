// src/pages/ArticleEditPage/ArticleEditPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { fetchArticleById } from '../../services/articleService';
import { editArticle, deleteArticle } from '../../services/authService';
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
      setError('Не получилось изменить статью, попробуйте еще раз');
      console.error('Error editing article:', err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteArticle(id);
      navigate('/');
    } catch (err) {
      setError('Не получилось удалить статью, попробуйте еще раз');
      console.error('Error deleting article:', err);
    }
  };

  if (loading) {
    return (
      <ArticleEditPageWrapper>
        <Loader />
      </ArticleEditPageWrapper>
    );
  }

  return (
    <ArticleEditPageWrapper>
      <div className='article-edit__inner'>
        <Link to={`/article/${id}`}><span className="article-edit__inner-link">Назад</span></Link>
        <h2 className='article-edit__inner-title'>Редактировать статью</h2>
        <form onSubmit={handleSubmit} className="article-form">
          <input
            type="text"
            placeholder="Заголовок"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='article-form__field'
          />
          <textarea
            placeholder="Содержимое"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className='article-form__field'
            id='content-field'
          />
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className='article-form__field'
            id='file-upload'
          />
          <p className="article-form__error" style={{visibility: `${error ? 'visible' : 'hidden'}`}}>{error}!</p>
          <button type="submit" className='article-form__button'>Сохранить изменения</button>
          <button type="button" onClick={handleDelete} className='article-form__button'>Удалить статью</button>
        </form>
      </div>
    </ArticleEditPageWrapper>
  );
};

export default ArticleEditPage;

