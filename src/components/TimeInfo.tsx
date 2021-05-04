import React from 'react';

// styled-components
import styled, { withTheme } from 'styled-components';

// elements
import { Grid, Text } from './elements';


type TimeInfoType = {
  info?: string[] | number[];
  timeIndex?: number[];
  hours?: number;
  dailyTime?: string[];
  label: string;
  score?: boolean;
}

// 시간대별 정보를 보여주는 긴 카드
const TimeInfo = (props: TimeInfoType) => {
  const { info, timeIndex, hours, dailyTime, label, score } = props;
  // 요일 배열
  const dayArray = []
  // 스피닝
  if (info === null) {
    return null
  }
  // score 표시인 경우
  if (score) {
    return (
      <>
        <ElTimeInfo>
          <Grid
            width="100%"
            height="30%"
            ai="center"
          >
            <Text
              size="1.4rem"
              bold
            >
              {label}
            </Text>
          </Grid>
          {/* 점수 정보 */}
          <Grid
            width="100%"
            height="70%"
          >
            {info.map((x, idx) => {
              return (
                <Grid
                  key={idx}
                  isColumn
                  height="85%"
                  width="12.5%"
                >
                  <Grid
                    height="15%"
                  >
                    <Text
                      size="1rem"
                      bold
                    >
                      요일
                      </Text>
                  </Grid>
                  <Grid
                    height="15%"
                  >
                    {x}
                  </Grid>
                </Grid>
              )
            }, {})
            }
          </Grid>
        </ElTimeInfo>
      </>
    )
  }
  // 날씨 정보 또는 강수확률인 경우
  return (
    <>
      <ElTimeInfo>
        <Grid
          width="100%"
          height="30%"
          ai="center"
        >
          <Text
            size="1.4rem"
            bold
          >
            {label}
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
              return (
                <Grid
                  key={idx}
                  isColumn
                  height="85%"
                  width="12.5%"
                >
                  <Grid
                    height="15%"
                  >
                    {time === String(hours) ?
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
                    그림
                  </Grid>
                  <Grid
                    height="15%"
                  >
                    {Math.round(Number(x))}
                  </Grid>
                </Grid>
              )
            }
            return null;
          }, {})
          }
        </Grid>
      </ElTimeInfo>
    </>
  )
}

TimeInfo.defaultProps = {
  info: null,
  timeIndex: [],
  hours: null,
  dailyTime: null,
  score: false,
}

const ElTimeInfo = styled.div`
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



export default TimeInfo;