import React, { Fragment } from 'react';

import styled from 'styled-components';

// elements
import { Grid } from './index';

type LongCardType = {
  height?: string;
  day:string;
  data:string;
}

// 푸터 컴포넌트
const LongCard = (props: LongCardType) => {
  const { height,day,data } = props;
  const style = {
    height
  }
  return (

    <ElLongCard
      {...style}
    >  <Text>{day}</Text>
        <Icon>아이콘</Icon>
        <Text>{data}</Text>      
    </ElLongCard>
  )
}

LongCard.defaultProps = {
  height: '10%'
}

const ElLongCard = styled.div<LongCardType>`
  ${props=>props.theme.flex.row};  
  justify-content:space-around;
  width: 60%;
  padding:1rem;
  height: ${(props) => props.height};
  border-radius: 20px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`

const Text = styled.div`
  font-weight:bold;
  font-size:1.5rem;
`

const Icon = styled.div`

`


export default LongCard;