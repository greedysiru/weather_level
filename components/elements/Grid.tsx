import React from 'react';
import styled from 'styled-components';

const Grid = (props) => {
  const {
    is_flex,
    width,
    margin,
    padding,
    bg,
    children,
    center,
    left,
    _onClick
  } = props;

  const styles = {
    is_flex: is_flex,
    width: width,
    margin: margin,
    padding: padding,
    bg: bg,
    center: center,
    left: left
  };

  return (
    <React.Fragment>
      <GridBox {...styles} onClick={_onClick}>
        {children}
      </GridBox>
    </React.Fragment>
  );
};

// 기본 값
Grid.defaultProps = {
  chidren: null,
  is_flex: false,
  width: '100%',
  padding: false,
  margin: false,
  bg: false,
  center: false,
  left: false,
  _onClick: () => { }
};

const GridBox = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  box-sizing: border-box;
  ${(props) => (props.padding ? `padding: ${props.padding};` : '')}
  ${(props) => (props.margin ? `margin: ${props.margin};` : '')}
  ${(props) => (props.bg ? `background-color: ${props.bg};` : '')}
  ${(props) =>
    props.is_flex
      ? `display: flex; align-items: center; justify-content: space-between; `
      : ''}
  ${(props) => (props.center ? `text-align: center;` : '')}
  ${(props) => (props.left ? `text-align: left;` : '')}
  ${(props) => (props.align_items_center ? `align-items: center;` : '')}
`;

export default Grid;