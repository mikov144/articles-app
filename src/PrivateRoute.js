// src/PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { getCurrentUser } from './services/authService';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = getCurrentUser();
  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
