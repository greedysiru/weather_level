import React from 'react';

// styled component
import styled from 'styled-components';

// 리덕스
import { useSelector } from 'react-redux';

// RootState
import { RootState } from '../../redux/modules';

// 말풍선을 나타내는 최소단위 컴포넌트
const SpeechBubble = () => {
  const message = useSelector((state: RootState) => state.weather.iconMessage);
  const messageLength = message.length;
  if (message === "") {
    return null;
  }
  // 말풍선 문자의 길이에 따라 다른 위치에 말풍선을 출력
  if (messageLength < 5) {
    return (
      <BubbleTypeTwo>
        {message}
      </BubbleTypeTwo>
    )
  }

  if (messageLength < 7) {
    return (
      <BubbleTypeOne>
        {message}
      </BubbleTypeOne>
    )
  }

  if (messageLength < 13) {
    <BubbleTypeFour>
      {message}
    </BubbleTypeFour>
  }

  return (
    <BubbleTypeThree>
      {message}
    </BubbleTypeThree>)



}


const BubbleTypeOne = styled.div`
position: absolute;
text-align: center;
padding: 0.6rem;
width: 8rem;
height: auto;
left: -1rem;
top: 6rem;
background: rgba(255, 255, 255, 0.8);
border: 1px solid #FFFFFF;
${(props) => props.theme.border_box}
${(props) => props.theme.shadow};
border-radius: 16px;
word-wrap:break-word;
font-size: 1.2rem;
font-weight: 500;
`

const BubbleTypeTwo = styled.div`
position: absolute;
text-align: center;
padding: 0.6rem;
width: 6rem;
height: auto;
left: 1rem;
top: 17rem;
background: rgba(255, 255, 255, 0.8);
border: 1px solid #FFFFFF;
${(props) => props.theme.border_box}
${(props) => props.theme.shadow};
border-radius: 16px;
word-wrap:break-word;
font-size: 1.2rem;
font-weight: 500;
`

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
border: 1px solid #FFFFFF;
${(props) => props.theme.border_box}
${(props) => props.theme.shadow};
border-radius: 16px;
word-wrap:break-word;
font-size: 1.2rem;
font-weight: 500;
line-height: 150%;
`

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
border: 1px solid #FFFFFF;
${(props) => props.theme.border_box}
${(props) => props.theme.shadow};
border-radius: 16px;
word-wrap:break-word;
font-size: 1.2rem;
font-weight: 500;
line-height: 150%;
`



export default SpeechBubble;