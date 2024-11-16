import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import ArticlePage from './pages/ArticlePage/ArticlePage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import CreateArticlePage from './pages/CreateArticlePage/CreateArticlePage';
import ArticleEditPage from './pages/ArticleEditPage/ArticleEditPage';
import PrivateRoute from './components/PrivateRoute';
import { CommentProvider } from './context/CommentContext';

function App() {
  return (
    <Router>
      <CommentProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/article/:id" element={<ArticlePage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<PrivateRoute element={ProfilePage} />} />
          <Route path="/create-article" element={<PrivateRoute element={CreateArticlePage} />} />
          <Route path="/edit-article/:id" element={<PrivateRoute element={ArticleEditPage} />} />
        </Routes>
      </CommentProvider>
    </Router>
  );
}

export default App;


