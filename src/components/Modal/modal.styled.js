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
    justify-content: center;
    align-items: center;
    width: 500px;
    height: 400px;
    background: #333333;
    border-radius: 8px;
    padding: 10px;
    position: relative;
    text-align: center;
    color: #a5d124;

    .modal__button {
      position: absolute;
      top: 5px;
      right: 5px;
    }
  }
`