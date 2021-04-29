import React from 'react';
import styled from 'styled-components';

type ButtonType = {
  disabled:boolean;   
  children: any;
  margin:boolean;
  width:string;
  padding:string;    
  _onClick:()=>void;
  color:string;
}

const Button = (props:ButtonType) => {
  const { disabled, children, margin, width, padding,color, _onClick} = props;
 
  return (
      <ElButton {...props} onClick={_onClick}>
        {children}
      </ElButton>
  );
};

Button.defaultProps = {
  children: null,
  _onClick: () => {},
  is_float: false,
  margin: '0',
  width: '100%',
  padding: '12px 0px'
};


const ElButton = styled.button<ButtonType>`
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
  color:${props=>props.color}
`;


export default Button;
