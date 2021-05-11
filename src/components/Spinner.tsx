import { url } from 'node:inspector';
import React from 'react';
import styled, { keyframes } from 'styled-components';

const Spinner = (props) => {
  const imgUrl = `/assets/logo/logo152.png`;
  return (
    <Container>
      <Image src={imgUrl} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(184, 184, 184, 0.5);
  top: 0;
  left: 0;
  ${(props) => props.theme.flex.row};
  justify-content: center;
`;

const spinnerAni = keyframes`
  0% {
     transform:rotateY(0deg)
  }
  50%{
    transform:rotateY(180deg)
  }
  100% {
    transform:rotateY(360deg)
  }
`;

const Image = styled.div`
  background-image: url('${(props) => props.src}');
  background-size: cover;
  width: 100px;
  height: 100px;
  background-color: yellow;
  border-radius: 20px;
  animation: ${spinnerAni} 3s linear infinite;
`;
export default Spinner;
