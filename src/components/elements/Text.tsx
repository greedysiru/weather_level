import React from 'react';
import styled from 'styled-components';

// 타입 지정
type TextType = {
  color?: string;
  size?: string;
  bold?: boolean;
  margin?: string;
  children?: any;
}

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
  bold: false,
  color: '#222831',
  size: '1.2rem',
  margin: false,
}


const P = styled.p<TextType>`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold ? "700" : "400")};
  ${(props) => (props.margin ? `margin: ${props.margin};` : '')}
`;

export default Text;

