import React, { useEffect } from 'react';
import styled from 'styled-components';

import { Text, Grid } from './index';

// 타입 지정
type RangeType = {
  label: string;
  value:string;
  _onChange?:()=>void;
}


const Range = (props: RangeType) => {
  const { label,value,_onChange } = props;
  const [rangeValue, setRangeValue] = React.useState<string>(value);

  return (
    <React.Fragment>      
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
    </React.Fragment>
  )
}

type LabelProps = {
  margin?:string;
  width?:string;
}


Range.defaultProps = {
  label: "",
  value: "0",
  _onChange:(e)=>{e.target.value}
}

const Label = styled.span<LabelProps>`
  
  margin: ${props=>props.margin? props.margin:0};
  width: ${props=>props.width? props.width:''};
`

const ElRange = styled.input`
  border: 1px splid #212121;
  width: 65%;
  padding: 12px 4px;
  box-sizing: border-box;
`;

export default Range;