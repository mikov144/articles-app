import styled from "styled-components";

export const ArticlePageWrapper = styled.div`
  padding: 20px 70px;
  background-color: #141414;

  .article-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin: 30px auto;
    padding: 20px;
    max-width: 1200px;
    width: 100%;
    border: 1px solid #cccccc;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(255, 255, 255, 0.1);

    .article-inner__title {
      margin-bottom: 20px;
      font-size: 32px;
      font-weight: 500;
      color: #ffffff;
    }

    .article-inner__image {
      margin-bottom: 20px;
      width: 600px;
      height: auto;
      border-radius: 8px;
    }

    .article-inner__author {
      margin-bottom: 20px;
      font-size: 14px;
      color: #a5d124;
    }

    .article-inner__content {
      margin-bottom: 40px;
      font-size: 22px;
      line-height: 120%;
      color: #ffffff;
      text-indent: 25px;
    }

    .buttons-wrapper {
      display: flex;
      justify-content: space-between;
      gap: 0 40px;

      .buttons-wrapper__button {
        margin-bottom: 10px;
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
  }
`
