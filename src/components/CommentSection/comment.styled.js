import styled from "styled-components";

export const CommentWrapper = styled.div`
  padding: 10px;
  border-bottom: 1px solid #eee;

  .edit-section {
    display: flex;
    flex-direction: column;
  }

  .edit-input__text {
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    max-width: 550px;
    width: 100%;
    resize: none;
    background-color: #333333;
    color: #ffffff;
  }

  .edit__button {
    margin-bottom: 20px;
    padding: 5px 10px;
    max-width: 250px;
    width: 100%;
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

  .comment__message {
    margin-bottom: 25px;
    color: #ffffff;
  }

  .comment__button {
    margin-bottom: 20px;
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

  .reply-input {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: start;

    .reply-input__text {
      padding: 10px;
      margin-bottom: 20px;
      border: 1px solid #ccc;
      border-radius: 4px;
      width: 70%;
      resize: none;
      background-color: #333333;
      color: #ffffff;
    }

    .reply-input__button {
      margin-bottom: 20px;
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
  }

  

  .replies {
    margin-bottom: 20px;
    padding-left: 20px;
  }

  .reply {
    padding: 10px;
    border-bottom: 1px solid #eee;
    border-left: 1px solid #eee;
  }

  .reply__message {
    margin-bottom: 10px;
    color: #ffffff;
  }
`

