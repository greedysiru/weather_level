import React, { Fragment } from 'react';

import styled from 'styled-components';

// elements
import { Grid } from './index';


type LongCardType = {
  height?: string;
  day:string;
  data: any;// string|object;
  type:string;
}

// 푸터 컴포넌트
const LongCard = (props: LongCardType) => {
  const { height,day,data,type } = props;
  const style = {
    height
  }
  return (

    <ElLongCard
      {...style}
    >  <Text>{day}</Text>
        <Icon>아이콘</Icon>
        {type==='etc' && <Text>{data}</Text>}
        {type==='tmp' && <Temp>
                            <Grid isColumn>
                              <TempText max>{data.max}</TempText>
                              <TempText>{data.min}</TempText>
                            </Grid>
                            <Text>{data.tmp}°C</Text>
                          </Temp>}
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

const Temp = styled.div`
  ${props=>props.theme.flex.row};
  width:100px;
`

const TempText = styled.span<{max:string}>`
  color:${props=>props.max?props.theme.color.veryBad:props.theme.color.usually}
`

export default LongCard;