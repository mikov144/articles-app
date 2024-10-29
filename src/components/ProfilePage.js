// src/components/ProfilePage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { changePassword, getCurrentUser } from '../services/authService';

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
      setError("New passwords don't match.");
      return;
    }
    try {
      await changePassword({ old_password: oldPassword, password: newPassword, confirmed_password: confirmedPassword });
      setMessage('Password changed successfully.');
      setError('');
    } catch (err) {
      setError('Password change failed. Please try again.');
      setMessage('');
    }
  };

  return (
    <div className="profile-page">
      <h1>{username}'s Profile</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmedPassword}
          onChange={(e) => setConfirmedPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        {message && <p className="message">{message}</p>}
        <button type="submit">Change Password</button>
      </form>
      <button onClick={() => navigate('/')} className="back-button">Back to Home</button>
    </div>
  );
};

export default ProfilePage;
