import React, { useEffect, useState } from 'react';

// styled component
import styled, { keyframes } from 'styled-components';

// 리덕스
import { useSelector } from 'react-redux';

// RootState
import { RootState } from '../../redux/modules';

// 말풍선을 나타내는 최소단위 컴포넌트
const SpeechBubble = (props) => {
  const message = useSelector((state: RootState) => state.weather.iconMessage);
  const messageLength = message.length;

  let bubbleType;
  if (messageLength < 5) {
    bubbleType = 'short';
  } else if (messageLength < 9) {
    bubbleType = 'mid';
  } else if (messageLength < 13) {
    bubbleType = 'long';
  } else {
    bubbleType = 'veryLong';
  }

  // speech 컴포넌트가 깜빡이는거 방지하기 위해
  if (messageLength === 0) return null;

  return <Bubble type={bubbleType}>{message}</Bubble>;
};

const bubbleAni = keyframes`
  0% {
     
    transform:skew(10deg) 
  }
  50% {    
     transform:skew(-10deg) 
  }
  100% {    
     transform:skew(10deg) 
  }
`;
const Bubble = styled.div`
  position: absolute;
  text-align: center;
  padding: 0.6rem;
  height: auto;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid #ffffff;
  ${(props) => props.theme.border_box}
  ${(props) => props.theme.shadow};
  border-radius: 16px;
  word-wrap: break-word;
  font-size: 1.2rem;
  font-weight: 500;
  ${(props) =>
    props.type === 'short'
      ? `
  left: 1rem;
  top: 17rem;`
      : ''};
  ${(props) =>
    props.type === 'mid'
      ? `
  left: -1rem;
  top: 6rem;`
      : ''};
  ${(props) =>
    props.type === 'long'
      ? ` width: 12rem;
  left: 17rem;
  top: 15rem;`
      : ''};
  ${(props) =>
    props.type === 'veryLong'
      ? ` width: 15rem;
  left: 14rem;
  top: 2rem;;`
      : ''};

  animation: ${bubbleAni} 1s infinite;
`;

export default SpeechBubble;
