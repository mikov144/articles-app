import styled from "styled-components";

export const ProfilePageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #141414;
  height: 100vh;

  .profile-page {
    max-width: 400px;
    width: 100%;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    .profile-page__title {
      margin-bottom: 20px;
      font-size: 32px;
      font-weight: 500;
      text-align: center;
      color: #ffffff;
    }

    .profile-page__form {
      display: flex;
      flex-direction: column;
    }

    .profile-page__field {
      margin-bottom: 20px;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      background-color: #333333;
      color: #ffffff;
    }

    .profile-page__button {
      margin-bottom: 15px;
      padding: 5px 10px;
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
    }

    #home-button {
      margin-bottom: 0;
    }

    .profile-page__error {
      font-size: 11px;
      color: red;
      text-align: center;
      margin-top: -10px;
      margin-bottom: 10px;
    }

    .profile-page__message {
      font-size: 11px;
      color: #a5d124;
      text-align: center;
      margin-top: -10px;
      margin-bottom: 10px;
    }
  }
`