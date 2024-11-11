//src/services/articleService.js
import axios from 'axios';

const API_URL = 'https://darkdes-django-t3b02.tw1.ru/api/v1/articles/';

export const fetchArticles = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const fetchArticleById = async (id) => {
  const response = await axios.get(`${API_URL}${id}/`);
  return response.data;
};

export const fetchCommentsByArticleId = async (articleId) => {
  const response = await axios.get(`${API_URL}${articleId}/comments/`);
  return response.data;
};

// Create Comment
export const createComment = async (articleId, commentData) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}${articleId}/comments/`, commentData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Edit Comment
export const editComment = async (articleId, commentId, commentData) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(`${API_URL}${articleId}/comments/${commentId}/`, commentData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Delete Comment
export const deleteComment = async (articleId, commentId) => {
  const token = localStorage.getItem('token');
  const response = await axios.delete(`${API_URL}${articleId}/comments/${commentId}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

