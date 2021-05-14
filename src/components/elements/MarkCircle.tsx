import React from 'react';

// styled component
import styled from 'styled-components';


type MarkCircleType = {
  children?: any;
  size?: number;
}

// 원 모양 표시
const MarkCircle = (props) => {
  const { children, size } = props;

  const styles = { size };

  return (
    <ElMarkCrice {...styles} >
      {children}
    </ElMarkCrice>
  )
}


const ElMarkCrice = styled.div`
    --size: ${(props) => props.size}rem;
    width: var(--size);
    height: var(--size);
    border-radius: var(--size);
    border: 3px solid ${(props) => props.theme.color.sky1};
    display: flex;
    align-items: center;
    justify-content: center;
`

export default MarkCircle;