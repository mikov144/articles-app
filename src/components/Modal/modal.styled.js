import styled from "styled-components";

export const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);

  .modal {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 500px;
    height: 310px;
    background: #333333;
    border-radius: 8px;
    padding: 10px;
    position: relative;
    text-align: center;
    border: 1px solid #ffffff;
    color: #a5d124;

    .close-modal {
      position: absolute;
      top: 10px;
      right: 10px;

      &:hover {
        opacity: 0.8;
      }
      
      &:active {
        opacity: 0.5;
      }
    }


    .modal-inner {
      margin-top: 60px;
      display: flex;
      gap: 0 30px;

      .modal__button {
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
      }
    }
  }
`