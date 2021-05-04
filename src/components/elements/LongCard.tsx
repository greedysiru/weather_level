import React, { Fragment } from 'react';

import styled from 'styled-components';

// elements
import { Grid } from './index';

type LongCardType = {
  height?: string;
}

// 푸터 컴포넌트
const LongCard = (props: LongCardType) => {
  const { height } = props;
  const style = {
    height
  }
  return (

    <ElLongCard
      {...style}
    >
      <Grid>
        LongCard
        </Grid>
    </ElLongCard>
  )
}

LongCard.defaultProps = {
  height: ' 100%'
}

const ElLongCard = styled.div<LongCardType>`
display:flex;
align-items: center;
jutify-contents: center;
width: 100%;
height: ${(props) => props.height};
border-radius: 20px;
box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`

export default LongCard;