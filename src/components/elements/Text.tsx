import React from 'react';
import styled from 'styled-components';

// 타입 지정
type TextType = {
  color?: string;
  size?: string;
  bold?: string;
  margin?: string;
  children?: any;
}

// 일반 텍스트 컴포넌트
// 굵기, 색상, 사이즈, 마진값 조정 가능
const Text = (props: TextType) => {
  const { bold, color, size, children, margin } = props;
  const styles = { bold, color, size, margin };
  return (
    <P {...styles}>
      {children}
    </P>
  );
}

Text.defaultProps = {
  children: null,
  bold: '400',
  color: '#222831',
  size: '1.2rem',
  margin: false,
}


const P = styled.p<TextType>`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.bold};
  ${(props) => (props.margin ? `margin: ${props.margin};` : '')}
`;

export default Text;

