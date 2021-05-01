import React from 'react';

// elements
import { Grid, Text } from './index';

import styled, { withTheme } from 'styled-components';

type longCardType = {
  info?: string[];
  timeIndex?: number[];
  hours?: number;
  dailyTime?: string[];
}

// 더 많은 정보를 보여주는 긴 카드
const LongCard = (props: longCardType) => {
  const { info, timeIndex, hours, dailyTime } = props;
  console.log(info)
  // timeIndex가 있는 경우
  if (timeIndex) {
    return (
      <React.Fragment>
        <ElLongCard>
          <Grid
            width="100%"
            height="30%"
            ai="center"
          >
            <Text
              size="1.4rem"
              bold
            >
              시간대별 날씨
          </Text>
          </Grid>
          {/* 날씨 정보 */}
          <Grid
            width="100%"
            height="70%"
          >
            {info.map((x, idx) => {
              if (timeIndex.includes(idx)) {
                const time: string = dailyTime[idx].split(' ')[2]
                console.log(idx)
                return (
                  <Grid
                    key={idx}
                    is_column
                    height="85%"
                    width="12.5%"
                  >
                    <Grid
                      height="15%"
                    >
                      {time == String(hours) ?
                        <Text
                          size="1rem"
                          bold
                        >
                          지금
                      </Text>
                        : time}
                    </Grid>
                    <Grid
                      height="70%"
                    >

                    </Grid>
                    <Grid
                      height="15%"
                    >
                      {Math.round(Number(x))}
                    </Grid>
                  </Grid>
                )
              }
            }
            )}
          </Grid>
        </ElLongCard>
      </React.Fragment>
    )
  }
}

LongCard.defaultProps = {
  timeIndex: false,
  hours: false,
  dailyTime: false,
}

const ElLongCard = styled.div`
display:flex;
flex-direction: column;
align-items: center;
jutify-contents: center;
width: 100%;
height: 100%;
border-radius: 20px;
box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
margin: 1rem 0;
`



export default LongCard;