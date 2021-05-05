import React from 'react';
import styled from 'styled-components';

type GridType = {
  width?: string;
  height?: string;
  isColumn?: boolean;
  jc?: string;
  ai?: string;
  bg?: string;
  margin?: string;
  padding?: string;
  children?: any;
  $wrap?: boolean;
  overFlow?: boolean;
}
const Grid = ({ width, height, isColumn, jc, ai, bg, margin, padding, children, $wrap, overFlow }: GridType) => {
  const style = {
    width, height, isColumn, jc, ai, bg, margin, padding, $wrap, overFlow
  }
  return <Container {...style}>{children}</Container>;
};

Grid.defaultProps = {
  width: '100%',
  height: '',
  isColumn: false,
  jc: 'center',
  ai: 'cetner',
  bg: '',
  margin: '0px',
  padding: '0px',
  children: null,
  $wrap: false,
  overFlow: false,
}


const Container = styled.div<GridType>`
  width: ${(props) => props.width};
  display: flex;
  height: ${(props) => (props.height ? props.height : '')};
  flex-direction: ${(props) => (props.isColumn ? 'column' : 'row')};
  justify-content: ${(props) => props.jc};
  align-items: ${(props) => props.ai};
  background-color: ${(props) => props.bg};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  flex-wrap: ${(props) => props.$wrap ? 'wrap' : ''};
  overflow: ${(props) => props.overFlow ? 'scroll' : ''};
`;

export default Grid;
