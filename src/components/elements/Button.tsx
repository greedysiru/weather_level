import React from 'react';
import styled from 'styled-components';

type ButtonType = {
  children?: any;
  _onClick?: () => void;
  isFloat?: boolean;
  margin?: string;
  width?: string;
  padding?: string;
  disabled?: boolean;
  color?: string;
};

const Button = (props: ButtonType) => {
  const { disabled, children, margin, width, padding, color, _onClick } = props;

  return (
    <ElButton {...props} onClick={_onClick}>
      {children}
    </ElButton>
  );
};

Button.defaultProps = {
  children: null,
  _onClick: () => {},
  isFloat: false,
  margin: '0',
  width: '100%',
  padding: '12px 0px',
  disabled: false,
  color: null,
};

const ElButton = styled.button<ButtonType>`
  width: ${(props) => props.width};
  background-color: #ffffff;
  color: ${(props) => (props.disabled ? props.theme.gray3 : `black`)};
  padding: ${(props) => props.padding};
  box-sizing: border-box;
  border-radius: 14px;
  border: none;
  ${(props) => (props.margin ? `margin: ${props.margin};` : '')};
  cursor: pointer;
  border: solid 0.5px ${(props) => props.theme.color.purple};
  box-shadow: ${(props) => props.theme.shadow};
  height: 52px;
  font-size: 1.25rem;
  font-weight: 550;
`;

export default Button;
