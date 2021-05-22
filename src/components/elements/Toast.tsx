import React from 'react';
import styled, { keyframes } from 'styled-components';

const Toast = (props) => {
  const { children } = props;
  return <Modal>{children}</Modal>;
};

const modalFade = keyframes`
  0% {
     opacity: 0;
    transform:translateY(0px) 
  },
  30% {
     opacity: 1;
    transform:translateY(-10px)
  }
  80% {
     opacity: 1;
    transform:translateY(-10px)
  }
  100% {
     opacity: 0;
    transform:translateY(0px)
  }
`;
const Modal = styled.div`
  position: absolute;
  padding: 15px;
  height: 30px;
  bottom: 90px;
  border-radius: 20px;
  color: white;
  ${(props) => props.theme.flex.row}
  justify-content:center;
  background-color: rgba(170, 170, 170, 0.7);
  animation: ${modalFade} 3s linear;
`;

export default Toast;
