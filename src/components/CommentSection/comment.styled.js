import styled from "styled-components";

export const CommentWrapper = styled.div`
  padding: 10px;
  margin-bottom: 20px;
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

  .comment-header {
    display: flex;
    flex-direction: column;
    align-items: start;
    margin-top: 25px;
    gap: 20px 0;
  }

  .comment-header__author {
    font-size: 18px;
    line-height: 23px;
    color: #ffffff;
  }

  .comment__meta {
    display: flex;
    align-items: center;
    margin-bottom: 25px;
    gap: 20px;
  }

  .comment__date {
    font-size: 14px;
    line-height: 17px;
    color: #a5d124;
  }

  .comment__message {
    margin-bottom: 25px;
    font-size: 20px;
    color: #ffffff;
  }

  .comment__button {
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

  .comment_button-icon {
    width: 18px;
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
    margin-bottom: 30px;
    padding-left: 20px;
  }

  .reply {
    display: flex;
    flex-direction: column;
    gap: 15px 0;
    padding: 20px;
    margin-bottom: 30px;
    border-bottom: 1px solid #eee;
    border-left: 1px solid #eee;
  }

  .reply__author {
    font-size: 18px;
    line-height: 23px;
    color: #ffffff;
  }

  .reply__date {
    font-size: 14px;
    line-height: 17px;
    color: #a5d124;
  }

  .reply__message {
    font-size: 20px;
    color: #ffffff;
  }
`

