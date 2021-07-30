import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../components/popup.css'
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';


const ModalContent = styled.div`
  background-color: #dbdbdb;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
  p {
    margin-bottom: 1rem;
  }
  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border-radius: 1.5;
  }
`;
const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

const Modal = ({ setShowModal }) => {

  return (
    <div className='container'>
      <Popup trigger={<button className="button"> Open </button>} modal>
        <ModalContent>
          <h1>f</h1>
          <CloseModalButton onClick={() => setShowModal(prev => !prev)} />
        </ModalContent>
      </Popup >
    </div>
  )
};

export default Modal