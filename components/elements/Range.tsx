import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Text, Grid } from './index';

// 타입 지정
type RangeType = {
  label: string;
  value:string;
  _onChange:()=>void;
  isHidden:boolean;
}

const Range = (props: RangeType) => {
  const { label,value,_onChange,isHidden } = props;
  const [rangeValue, setRangeValue] = React.useState<string>(value);

  return (
    <Container isHidden={isHidden}>      
      <Grid ai="center" jc="space-between">
        {label && <Label width="100px">{label}</Label>}
        
        <ElRange
          type="range"
          min='0'
          max='10'
          defaultValue={rangeValue}
          onChange={_onChange}
                  />
        <Label margin="5px">{rangeValue}</Label>
        </Grid>      
    </Container>
  )
}

Range.defaultProps = {
  label: "",
  value: "0",
  _onChange:(e)=>{e.target.value},
  isHidden:false
}

type LabelProps = {
  margin?:string;
  width?:string;
}

const Container = styled.div<{isHidden:boolean}>`
display:${props=>props.isHidden?'none':'block'};
`
const Label = styled.span<LabelProps>`  
  margin: ${props=>props.margin? props.margin:0};    
`

const ElRange = styled.input`
  border: 1px splid #212121;
  width: 65%;
  padding: 12px 4px;
  box-sizing: border-box;
`;

export default Range;