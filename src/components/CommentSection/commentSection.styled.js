import styled from "styled-components";

export const CommentSectionWrapper = styled.div`
  width: 1100px;
  margin: 0 auto;

  .comment-section__title {
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: 400;
    color: #ffffff;
  }

  .comment-section__input {
    display: flex;
    flex-direction: column;
    align-items: start;
    margin-bottom: 20px;

    .comment-section__input-text {
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      width: 100%;
      resize: none;
      background-color: #333333;
      color: #ffffff;
    }

    .comment-section__input-button {
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
  }

  .comment-section__list {
    margin-top: 20px;
  }
`


