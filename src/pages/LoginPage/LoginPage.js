import React, { useState } from 'react';
import { login } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { LoginPageWrapper } from './loginPage.styled';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      await login({ username, password });
      localStorage.setItem('username', username);
      navigate('/');
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.detail || 'Login failed');
        setLoading(false)
      } else {
        setError('An error occurred. Please try again.');
        setLoading(false)
      }
      console.error('Login error:', err);
    }
  };

  return (
    <LoginPageWrapper>
      <div className="login">
        <Link to='/register'><span className="login-toggle">Зарегистрироваться</span></Link>
        <h1 className='login-title'>Вход</h1>
        <form onSubmit={handleSubmit} className='login-form'>
          <input
            type="text"
            placeholder="Имя пользователя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='login-form__field'
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='login-form__field'
          />
          <p className="login-form__error" style={{visibility: `${error ? 'visible' : 'hidden'}`}}>{error}!</p>
          <button type="submit" className='login-form__button' disabled={loading}>{loading ? <Spinner animation="border" role="status"><span className="visually-hidden">Загрузка...</span></Spinner> : <p>Войти</p>}</button>
        </form>
      </div>
    </LoginPageWrapper>
  );
};

export default LoginPage;
