import React from 'react';
import styled from 'styled-components';

const Button = (props) => {
  const {
    disabled,
    _onClick,
    is_float,
    children,
    margin,
    width,
    padding
  } = props;

  if (is_float) {
    return (
      <React.Fragment>
        <FloatButton onClick={_onClick}>{children}</FloatButton>
      </React.Fragment>
    );
  }

  const styles = {
    margin: margin,
    width: width,
    padding: padding
  };

  return (
    <React.Fragment>
      <ElButton disabled={disabled} {...styles} onClick={_onClick}>
        {children}
      </ElButton>
    </React.Fragment>
  );
};

Button.defaultProps = {
  children: null,
  _onClick: () => { },
  is_float: false,
  margin: false,
  width: '100%',
  padding: '12px 0px'
};

const ElButton = styled.button`
  width: ${(props) => props.width};
  background-color: ${(props) => props.theme.main_color};
  color: #ffffff;
  padding: ${(props) => props.padding};
  box-sizing: border-box;
  border-radius: 12px;
  border: none;
  ${(props) => (props.margin ? `margin: ${props.margin};` : '')};
  cursor: pointer;
  border-color: ${(props) => (props.disabled ? 'gray' : '#ffffff')};
  ${(props) =>
    props.disabled
      ? `background-color:gray; color:white`
      : `
  background-color:#212121; color:white
  `}
`;

const FloatButton = styled.button`
  width: 50px;
  height: 50px;
  background-color: ${(props) => props.theme.theme_yellow};
  color: #ffffff;
  box-sizing: border-box;
  font-size: 36px;
  font-weight: 800;
  position: absolute;
  bottom: 50px;
  right: 16px;
  text-align: center;
  vertical-align: middle;
  border: none;
  border-radius: 50px;
`;

export default Button;
