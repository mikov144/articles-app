import { ProfilePageWrapper } from './profilePage.styled';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { changePassword, getCurrentUser } from '../../services/authService';

const ProfilePage = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setUsername(user);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmedPassword) {
      setError("Пароли не совпадают");
      return;
    }
    try {
      await changePassword({ old_password: oldPassword, password: newPassword, confirmed_password: confirmedPassword });
      setMessage('Пароль был успешно изменён');
      setError('');
    } catch (err) {
      setError('Не удалось сменить пароль. Попробуйте ещё раз');
      setMessage('');
    }
  };

  return (
    <ProfilePageWrapper>
      <div className='profile-page'>
        <h1 className='profile-page__title'>Пользователь: {username}</h1>
        <form onSubmit={handleSubmit} className='profile-page__form'>
          <input
            className='profile-page__field'
            type="password"
            placeholder="Старый пароль"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
          <input
            className='profile-page__field'
            type="password"
            placeholder="Новый пароль"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            className='profile-page__field'
            type="password"
            placeholder="Повторите новый пароль"
            value={confirmedPassword}
            onChange={(e) => setConfirmedPassword(e.target.value)}
            required
          />
          <p className="profile-page__error" style={{visibility: `${error ? 'visible' : 'hidden'}`}}>{error}!</p>
          <p className="profile-page__message" style={{visibility: `${message ? 'visible' : 'hidden'}`}}>{message}!</p>
          <button type="submit" className='profile-page__button' id='change-btn'>Изменить пароль</button>
          <button onClick={() => navigate('/')} className='profile-page__button' id='home-button'>На главную</button>
        </form>
      </div>
    </ProfilePageWrapper>
  );
};

export default ProfilePage;
