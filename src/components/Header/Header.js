import { HeaderWrapper } from './header.styled';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../../services/authService';

const Header = () => {
  const navigate = useNavigate();
  const username = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <HeaderWrapper>
      <h1 className='header__title'>Новостная лента</h1>
      <div className="navigation">
        {username ? (
          <>
            <button onClick={() => navigate('/profile')} className="navigation__button">Профиль</button>
            <button onClick={handleLogout} className="navigation__button">Выйти</button>
          </>
        ) : (
          <button onClick={() => navigate('/login')} className="navigation__button">Войти</button>
        )}
      </div>
    </HeaderWrapper>
  );
};

export default Header;
