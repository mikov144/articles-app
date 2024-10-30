import styled from "styled-components";

export const ArticleCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #cccccc;
  border-radius: 8px;
  padding: 18px;
  width: 432px;
  background-color: #1F1F1F;
  box-shadow: 0 4px 8px rgba(255, 255, 255, 0.1);

  .article-card__image-wrapper {
    margin-bottom: 20px;

    .article-card__image {
      width: 100%;
      height: auto;
      border-radius: 8px;
    }
  }

  .article-card__title {
    margin-bottom: 20px;
    font-size: 28px;
    font-weight: 400;
    line-height: 26px;
    color: #ffffff;
    cursor: pointer;
  }

  .article-card__username {
    margin-bottom: 20px;
    font-size: 18px;
    color: #a5d124;
  }

  .article-card__content {
    margin-bottom: 20px;
    font-size: 22px;
    line-height: 23px;
    color: #ffffff;
  }

  .article-card__button {
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
`


