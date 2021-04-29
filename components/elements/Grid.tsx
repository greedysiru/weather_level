import React from 'react';
import styled from 'styled-components';

type GridType = {
  width:string;
  height:string;
  is_column:boolean;
  jc:string;
  ai:string;
  bg:string;
  margin:string;
  children:any;
}
const Grid = ({width, height,is_column, jc, ai, bg, margin, children}:GridType) => {
  const style = {
    
    width, height,is_column, jc, ai, bg, margin
  }
  return <Container {...style}>{children}</Container>;
};

Grid.defaultProps = {
  width:'100%',
  height:'',
  is_column:'row',
  jc:'center',
  ai:'cetner',
  bg:'white',
  margin:'0px',
  children: null
}


const Container = styled.div<GridType>`
  width: ${(props) => props.width };
  display: flex;
  height: ${(props) => (props.height ? props.height : '')};
  flex-direction: ${(props) => (props.is_column ? 'column' : 'row')};
  justify-content: ${(props) => (props.jc ? props.jc : 'center')};
  align-items: ${(props) => (props.ai ? props.ai : 'center')};
  background-color: ${(props) => props.bg};
  margin: ${(props) => props.margin };
`;

export default Grid;
