import styled from "styled-components";

export const RegistrationPageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #141414;
  height: 100vh;

  .registration {
    max-width: 400px;
    width: 100%;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #141414;
  }

  .registration-toggle {
    display: flex;
    justify-content: right;
    margin-bottom: 13px;
    font-size: 11px;
    line-height: 13px;
    text-decoration: underline;
    color: #a5d124;
    cursor: pointer;

    &:hover {
      color: #d57251;
    }

    &:active {
      opacity: 0.7;
    }
  }

  .registration-title {
    margin-bottom: 20px;
    font-size: 28px;
    font-weight: 500;
    color: #ffffff;
    text-align: center;
  }

  .registration-form {
    display: flex;
    flex-direction: column;
  }

  .registration-form__field {
    margin-bottom: 6px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #333333;
    color: #ffffff;
  }

  .registration-form__button {
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
    padding: 10px;
    border: none;
    background-color: #a5d124;
    color: #000000;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #89ad1c;
      }

    &:active {
      opacity: 0.5;
    }

    &:disabled {
      background-color: #c0c0c0;
    }
  }

  .registration-form__error {
    margin-left: 18px;
    margin-bottom: 6px;
    font-size: 8px;
    line-height: 10px;
    color: #FF0B0B;
  }
`


