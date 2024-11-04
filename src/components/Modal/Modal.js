import { ModalWrapper } from './modal.styled'

export const Modal = ({ children }) => {
  return <ModalWrapper>
    <div className='modal'>
      {children}
    </div>
  </ModalWrapper>
}