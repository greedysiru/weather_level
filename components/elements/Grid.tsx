import React from 'react';
import styled from 'styled-components';

type GridType = {
  width?: string;
  height?: string;
  is_column?: boolean;
  jc?: string;
  ai?: string;
  bg?: string;
  margin?: string;
  padding?: string;
  children?: any;
}
const Grid = ({ width, height, is_column, jc, ai, bg, margin, padding, children }: GridType) => {
  const style = {
    width, height, is_column, jc, ai, bg, margin, padding,
  }
  return <Container {...style}>{children}</Container>;
};

Grid.defaultProps = {
  width: '100%',
  height: '',
  is_column: false,
  jc: 'center',
  ai: 'cetner',
  bg: 'white',
  margin: '0px',
  paddig: '0px',
  children: null
}


const Container = styled.div<GridType>`
  width: ${(props) => props.width};
  display: flex;
  height: ${(props) => (props.height ? props.height : '')};
  flex-direction: ${(props) => (props.is_column ? 'column' : 'row')};
  justify-content: ${(props) => props.jc };
  align-items: ${(props) => props.ai };
  background-color: ${(props) => props.bg};
  margin: ${(props) => props.margin };
  box-sizing:border-box;
`;

export default Grid;
