import styled from "styled-components";

export const HomePageWrapper = styled.div`
  padding: 20px 70px;
  text-align: center;
  background-color: #141414;

  .articles-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
  }

  .buttonWrapper {
    display: flex;

    .home-button {
      margin-top: 15px;
      margin-bottom: 15px;
      margin-left: 22px;
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
    }
  }
`