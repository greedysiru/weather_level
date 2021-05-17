import React, { useEffect, useState } from 'react';

// styled component
import styled, { keyframes } from 'styled-components';

// 리덕스
import { useDispatch, useSelector } from 'react-redux';

// RootState
import { weatherActions } from 'src/redux/modules/weather';
import { RootState } from '../../redux/modules';

// 말풍선을 나타내는 최소단위 컴포넌트
const SpeechBubble = () => {
  let timer;
  const message = useSelector((state: RootState) => state.weather.iconMessage);
  const messageLength = message.length;
  const dispatch = useDispatch();
  const [bubbleType, setBubbleType] = useState('short');
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    console.log('삐육');

    return () => {
      clearTimeout(timer);
      setIsShow(false);
      console.log('clean', timer);
    };
  }, []);

  useEffect(() => {
    clearTimeout(timer);
    if (messageLength < 1) return;

    timer = setTimeout(() => {
      dispatch(weatherActions.setIconMessage(''));
    }, 3000);
    /* 
    if (messageLength < 5) {
      console.log('short');
      setBubbleType('short');
    } else if (messageLength < 7) {
      console.log('mid');
      setBubbleType('mid');
    } else if (messageLength < 13) {
      console.log('long');
      setBubbleType('long');
    } else {
      setBubbleType('veryLong');
    }

    setIsShow(true); */
  }, [messageLength]);

  if (message === '') {
    return null;
  }

  // 말풍선 문자의 길이에 따라 다른 위치에 말풍선을 출력
  if (messageLength < 5) {
    return <BubbleTypeTwo>{message}</BubbleTypeTwo>;
  }

  if (messageLength < 7) {
    return <BubbleTypeOne>{message}</BubbleTypeOne>;
  }

  if (messageLength < 13) {
    <BubbleTypeFour>{message}</BubbleTypeFour>;
  }

  return <BubbleTypeThree>{message}</BubbleTypeThree>;
  // return isShow && <Bubble type={bubbleType}>{message}</Bubble>;
};
const bubbleAni = keyframes`
  0% {
     
    transform:skew(10deg) 
  }
 /*  30% {
   
     transform:skew(-10deg) 
  }
  80% {
     
     transform:skew(10deg) 
  } */
  50% {    
     transform:skew(-10deg) 
  }
  100% {    
     transform:skew(10deg) 
  }
`;
/* const Bubble = styled.div`
  position: absolute;
  text-align: center;
  padding: 0.6rem;
  width: 8rem;
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
      ? `width: 6rem;
  left: 1rem;
  top: 17rem;`
      : ''};
  ${(props) =>
    props.type === 'mid'
      ? `width: 8rem;
  left: -1rem;
  top: 6rem;`
      : ''};
  ${(props) =>
    props.type === 'long'
      ? ` width: 10rem;
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
`; */
const BubbleTypeOne = styled.div`
  position: absolute;
  text-align: center;
  padding: 0.6rem;
  width: 8rem;
  height: auto;
  left: -1rem;
  top: 6rem;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid #ffffff;
  ${(props) => props.theme.border_box}
  ${(props) => props.theme.shadow};
  border-radius: 16px;
  word-wrap: break-word;
  font-size: 1.2rem;
  font-weight: 500;
  animation: ${bubbleAni} 1s infinite;
`;

const BubbleTypeTwo = styled.div`
  position: absolute;
  text-align: center;
  padding: 0.6rem;
  width: 6rem;
  height: auto;
  left: 1rem;
  top: 17rem;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid #ffffff;
  ${(props) => props.theme.border_box}
  ${(props) => props.theme.shadow};
  border-radius: 16px;
  word-wrap: break-word;
  font-size: 1.2rem;
  font-weight: 500;
  animation: ${bubbleAni} 1s infinite;
`;

const BubbleTypeThree = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem;
  width: 15rem;
  height: auto;
  left: 14rem;
  top: 2rem;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid #ffffff;
  ${(props) => props.theme.border_box}
  ${(props) => props.theme.shadow};
  border-radius: 16px;
  word-wrap: break-word;
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 150%;
  animation: ${bubbleAni} 1s infinite;
`;

const BubbleTypeFour = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem;
  width: 10rem;
  height: auto;
  left: 17rem;
  top: 15rem;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid #ffffff;
  ${(props) => props.theme.border_box}
  ${(props) => props.theme.shadow};
  border-radius: 16px;
  word-wrap: break-word;
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 150%;
  animation: ${bubbleAni} 1s infinite;
`;

export default SpeechBubble;
