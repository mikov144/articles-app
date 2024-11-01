// src/components/CreateArticleForm.js
import React, { useState } from 'react';
import { createArticle } from '../../services/authService';

const CreateArticleForm = ({ onArticleCreated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      setMessage('Article created successfully.');
      setError('');
      onArticleCreated(); // Callback to refresh articles list on HomePage
    } catch (err) {
      setError('Failed to create article. Please try again.');
      setMessage('');
      console.error('Error creating article:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-article-form">
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
      {message && <p className="message">{message}</p>}
      <button type="submit">Create Article</button>
    </form>
  );
};

export default CreateArticleForm;
