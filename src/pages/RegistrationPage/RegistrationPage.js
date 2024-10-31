import React, { useState, useEffect } from 'react';
import { register } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { RegistrationPageWrapper } from './registrationPage.styled';
import { Link } from "react-router-dom"

const RegistrationPage = () => {
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
  });

  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    username: false,
    email: false,
    password: false,
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  const changeFormItem = (fieldName) => ({ target: { value } }) => {
    setValues((prevValues) => ({ ...prevValues, [fieldName]: value }));
    if (touched[fieldName] === false) {
      setTouched((prevTouched) => ({ ...prevTouched, [fieldName]: true }));
    }
  };

  const validateEmail = (email) => {
    const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'gi');
    if (email.length === 0 && touched['email']) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Поле не должно быть пустым' }));
    } else if (!regex.test(email) && touched['email']) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Неверный формат email' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
    }
  };

  const validatePassword = (password) => {
    if (password.length === 0 && touched['password']) {
      setErrors((prevErrors) => ({ ...prevErrors, password: 'Поле не должно быть пустым' }));
    } else if (password.length < 6 && touched['password']) {
      setErrors((prevErrors) => ({ ...prevErrors, password: 'Пароль должен быть не короче 6-ти символов' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
    }
  };

  const validateNotEmpty = (field, fieldName) => {
    if (field.length === 0 && touched[fieldName]) {
      setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: 'Поле не должно быть пустым' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: '' }));
    }
  };

  useEffect(() => {
    const { firstName, lastName, username, email, password, } = values;
    validateNotEmpty(firstName, 'firstName');
    validateNotEmpty(lastName, 'lastName');
    validateNotEmpty(username, 'username');
    validateEmail(email);
    validatePassword(password);
  }, [values, touched]);

  useEffect(() => {
    const isAnyFieldUntouched = Object.keys(touched).some(key => !touched[key]);
    if (Object.keys(errors).some((error) => errors[error].length > 0) || isAnyFieldUntouched) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [errors, touched]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      setErrors((prevErrors) => ({ ...prevErrors, form: 'Форма заполнена неверно' }));
      return;
    }
    try {
      await register({ username: values.username, email: values.email, password: values.password, first_name: values.firstName, last_name: values.lastName });
      console.log('Registration successful');
      navigate('/login');
    } catch (err) {
      if (err.response && err.response.data) {
        setErrors(err.response.data.detail || 'Registration failed');
      } else {
        setErrors('An error occurred. Please try again.');
      }
      console.error('Registration error:', err);
    }
  };

  return (
    <RegistrationPageWrapper>
      <div className='registration'>
        <Link to='/login'><span className="registration-toggle">Авторизоваться</span></Link>
        <h1 className='registration-title'>Регистрация</h1>
        <form onSubmit={handleSubmit} className='registration-form'>
          <input
            type="text"
            placeholder="Имя"
            value={values.firstName}
            onChange={changeFormItem('firstName')}
            className='registration-form__field'
          />
          <p className='registration-form__error' style={{visibility: `${errors.firstName ? 'visible' : 'hidden'}`}}>{errors.firstName}!</p>
          <input
            type="text"
            placeholder="Фамилия"
            value={values.lastName}
            onChange={changeFormItem('lastName')}
            className='registration-form__field'
          />
          <p className='registration-form__error' style={{visibility: `${errors.lastName ? 'visible' : 'hidden'}`}}>{errors.lastName}!</p>
          <input
            type="text"
            placeholder="Имя пользователя"
            value={values.username}
            onChange={changeFormItem('username')}
            className='registration-form__field'
          />
          <p className='registration-form__error' style={{visibility: `${errors.username ? 'visible' : 'hidden'}`}}>{errors.username}!</p>
          <input
            type="email"
            placeholder="Электронная почта"
            value={values.email}
            onChange={changeFormItem('email')}
            className='registration-form__field'
          />
          <p className='registration-form__error' style={{visibility: `${errors.email ? 'visible' : 'hidden'}`}}>{errors.email}!</p>
          <input
            type="password"
            placeholder="Пароль"
            value={values.password}
            onChange={changeFormItem('password')}
            className='registration-form__field'
          />
          <p className='registration-form__error' style={{visibility: `${errors.password ? 'visible' : 'hidden'}`}}>{errors.password}!</p>
          <button type="submit" className='registration-form__button' disabled={!isFormValid}>Зарегистрироваться</button>
        </form>
      </div>
    </RegistrationPageWrapper>
  );
};

export default RegistrationPage;
