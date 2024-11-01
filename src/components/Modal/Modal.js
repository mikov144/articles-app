import { ModalWrapper } from './modal.styled'

export const Modal = ({ children }) => {
  return <ModalWrapper>
    <div className='modal'>
      {/* <button className='modal__button'>X</button> */}
      {children}
    </div>
  </ModalWrapper>
}