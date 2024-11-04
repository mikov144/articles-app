// src/pages/ArticleEditPage/ArticleEditPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { fetchArticleById } from '../../services/articleService';
import { editArticle, deleteArticle } from '../../services/authService';
import { ArticleEditPageWrapper } from './articleEditPage.styled';
import Spinner from 'react-bootstrap/Spinner';
import { Modal } from '../../components/Modal/Modal';

const ArticleEditPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [thinkingConfirm, setThinkingConfirm] = useState(false);
  const [thinkingDelete, setThinkingDelete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getArticle = async () => {
      try {
        const data = await fetchArticleById(id);
        setTitle(data.title);
        setContent(data.content);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };
    getArticle();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setThinkingConfirm(true);
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
    setLoading(true);
    setThinkingDelete(true);
    try {
      await deleteArticle(id);
      navigate('/');
    } catch (err) {
      setError('Не получилось удалить статью, попробуйте еще раз');
      console.error('Error deleting article:', err);
    }
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const confirmDelete = () => {
    handleDelete();
    closeModal();
  };

  return (
    <ArticleEditPageWrapper>
      {showModal && (
        <Modal>
          <p>Вы уверены, что хотите удалить эту статью?</p>
          <div className='modal-inner'>
            <button onClick={confirmDelete} disabled={loading} className='modal__button'>Да</button>
            <button onClick={closeModal} disabled={loading} className='modal__button'>Нет</button>
          </div>
        </Modal>
      )}
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
          <button type="submit" className='article-form__button' disabled={loading}>
            {thinkingConfirm ? <Spinner animation="border" role="status"><span className="visually-hidden">Загрузка...</span></Spinner> : <p>Сохранить изменения</p>}
          </button>
          <button type="button" onClick={openModal} className='article-form__button' disabled={loading}>
            {thinkingDelete ? <Spinner animation="border" role="status"><span className="visually-hidden">Загрузка...</span></Spinner> : <p>Удалить статью</p>}
          </button>
        </form>
      </div>
    </ArticleEditPageWrapper>
  );
};

export default ArticleEditPage;

