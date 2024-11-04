import styled from "styled-components";

export const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #1F1F1F;
  border: 1px solid #cccccc;
  border-radius: 10px;

  .header__title {
    font-size: 32px;
    font-weight: 500;
    color: #ffffff;

    &:hover {
      opacity: 0.8;
    }

    &:active {
      opacity: 0.6;
    }
  }

  .navigation {
    display: flex;
    align-items: center;

    .navigation__button {
      padding: 5px 10px;
      margin-left: 10px;
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