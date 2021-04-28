import React from 'react';
import styled from 'styled-components';

import { Text, Grid } from './index';

// 타입 지정
type RangeType = {
  label: string;
  _onChange: () => void;
}


const Range = (props: RangeType) => {
  const { label, _onChange } = props;

  return (
    <React.Fragment>
      <Grid>
        {label && <Text margin="0px">{label}</Text>}
        <ElRange type="range" />
      </Grid>
    </React.Fragment>
  )
}

Range.defaultProps = {
  label: "",
  value: "",
  _onChange: () => { },
}

const ElRange = styled.input`
  border: 1px splid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;

export default Range;