import React, { useEffect } from 'react';
import styled from 'styled-components';

import { Text, Grid } from './index';

// 타입 지정
type RangeType = {
  label: string;
}


const Range = (props: RangeType) => {
  const { label } = props;
  const [count, setCount] = React.useState<string>('');
  useEffect(() => {
    console.log(count)
  }, [count])
  return (
    <React.Fragment>
      <Grid>
        {label && <Text margin="0px">{label}</Text>}
        <Text>{count}</Text>
        <ElRange
          type="range"
          min='0'
          max='100'
          onChange={(e) => { setCount(e.target.value) }}
        />
      </Grid>
    </React.Fragment>
  )
}

Range.defaultProps = {
  label: "",
  value: "",
}

const ElRange = styled.input`
  border: 1px splid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;

export default Range;