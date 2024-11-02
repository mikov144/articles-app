// src/components/CreateArticleForm/CreateArticleForm.js
import React, { useState } from 'react';
import { createArticle } from '../../services/authService';
import { CreateArticleFormWrapper } from './createArticleForm.styled';
import { Link } from 'react-router-dom';
import Spinner from "react-spinkit"

const CreateArticleForm = ({ onArticleCreated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }

    try {
      await createArticle(formData);
      setTitle('');
      setContent('');
      setImage(null);
      setLoading(false)
      setMessage('Статья была успешно создана');
      setError('');
      if (onArticleCreated) {
        onArticleCreated();
      }
    } catch (err) {
      setError('Не удалось создать статью, попробуйте еще раз');
      setMessage('');
      setLoading(false)
      console.error('Error creating article:', err);
    }
  };

  return (
    <CreateArticleFormWrapper onSubmit={handleSubmit}>
      <div className='create-article'>
        <Link to='/'><span className="create-article__home-link">На главную</span></Link>
        <h2 className="create-article__tittle">Создание новой статьи</h2>
        <input
          type="text"
          placeholder="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='create-article__field'
        />
        <textarea
          placeholder="Содержимое"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className='create-article__field'
          id='content-field'
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className='create-article__field'
          id='file-upload'
        />
        <p className="create-article__error" style={{visibility: `${error ? 'visible' : 'hidden'}`}}>{error}!</p>
        <p className="create-article__message" style={{visibility: `${message ? 'visible' : 'hidden'}`}}>{message}!</p>
        <button type="submit" className='create-article__button' disabled={loading}>{loading ? <Spinner name='circle' /> : <p>Создать статью</p>}</button>
      </div>
    </CreateArticleFormWrapper>
  );
};

export default CreateArticleForm;

