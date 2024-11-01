// src/services/authService.js
import axios from 'axios';

const API_URL = 'https://darkdes-django-t3b02.tw1.ru/api/v1/registration/';
const TOKEN_URL = 'https://darkdes-django-t3b02.tw1.ru/api/v1/token/';
const REFRESH_TOKEN_URL = 'https://darkdes-django-t3b02.tw1.ru/api/v1/token/refresh/';
const CHANGE_PASSWORD_URL = 'https://darkdes-django-t3b02.tw1.ru/api/v1/change-password/';
const CREATE_ARTICLE_URL = 'https://darkdes-django-t3b02.tw1.ru/api/v1/articles/';

export const register = async (userData) => {
  const response = await axios.post(API_URL, userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await axios.post(TOKEN_URL, credentials);
  if (response.data.access) {
    localStorage.setItem('token', response.data.access);
  }
  return response.data;
};

export const refreshToken = async (refreshToken) => {
  const response = await axios.post(REFRESH_TOKEN_URL, { refresh: refreshToken });
  if (response.data.access) {
    localStorage.setItem('token', response.data.access);
  }
  return response.data;
};

export const changePassword = async (passwordData) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(CHANGE_PASSWORD_URL, passwordData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createArticle = async (articleData) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(CREATE_ARTICLE_URL, articleData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
};

export const getCurrentUser = () => {
  return localStorage.getItem('username');
};

