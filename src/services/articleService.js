// src/services/articleService.js
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

export const fetchCommentsByArticleId = async (id) => {
  const response = await axios.get(`${API_URL}${id}/comments/`);
  const comments = response.data.map(comment => ({
    ...comment,
    replies: comment.replies || [] // Ensure replies is an array
  }));
  return comments;
};

