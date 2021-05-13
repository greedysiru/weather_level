import React from 'react';

// styled-components
import styled from 'styled-components';

// elements
import { Grid, Text, Icon } from './elements';

// theme
import theme from '../styles/theme';

// common
import { convertWeaterInfo } from '../shared/common';


type TimeInfoType = {
  info?: string[] | number[];
  timeIndex?: number[];
  hours?: number;
  dailyTime?: string[];
  dayOfWeek?: string[];
  label: string;
  score?: boolean;
  height?: string;
  rain?: boolean;
  weatherIcon?: string[];
}

// 시간대별 정보를 보여주는 긴 카드
const TimeInfo = (props: TimeInfoType) => {
  const { color } = theme;
  const { info, timeIndex, hours, dailyTime, dayOfWeek, label, score, height, rain, weatherIcon } = props;
  const style = {
    height
  }

  // 스피닝
  if (info === null) {
    return null
  }
  // score 표시인 경우
  if (score) {

    return (
      <ElTimeInfo
        {...style}
      >
        <Grid
          width="100%"
          height="35%"
          ai="center"
        >
          <Text
            size="1.5rem"
            bold="700"
          >
            {label}
          </Text>
        </Grid>
        {/* 점수 정보 */}
        <Grid
          width="100%"
          height="50%"
        >
          {info.map((score, idx) => {
            // 점수 색상
            let scoreColor = ''
            if (score <= 25) {
              scoreColor = color.veryBad;
            }
            else if (score <= 50) {
              scoreColor = color.bad;
            }
            else if (score <= 75) {
              scoreColor = color.usually;
            }
            else if (score > 75) {
              scoreColor = color.good;
            }
            return (
              <Grid
                key={idx}
                isColumn
                jc="space-between"
                ai="center"
                height="68%"
                width="14.28%"
              >
                <Grid
                  height="15%"
                >
                  {idx === 0 ? (
                    <Text
                      size="1.2rem"
                      bold="700"
                    >
                      {dayOfWeek[idx]}
                    </Text>
                  ) : (
                    <Text
                      size="1rem"
                    >
                      {dayOfWeek[idx]}
                    </Text>
                  )}

                </Grid>
                <Grid
                  ai='center'
                  jc='center'
                >
                  <Text
                    color={scoreColor}
                    bold="600"
                    size="1.5rem"
                  >
                    {score}
                  </Text>
                </Grid>
              </Grid>
            )
          }, {})
          }
        </Grid>
      </ElTimeInfo>
    )
  }
  // 강수 정보인 경우
  if (rain) {
    return (
      <>
        <ElTimeInfo>
          <Grid
            width="100%"
            height="35%"
            ai="center"
          >
            <Text
              size="1.5rem"
              bold="500"
            >
              {label}
            </Text>
          </Grid>
          <Grid
            width="100%"
            height="50%"
          >
            {info.map((x, idx) => {
              if (timeIndex.includes(idx)) {
                const time: string = dailyTime[idx].split(' ')[2]
                const rainPercent = Math.round(x * 100)
                const iconColor = convertWeaterInfo('rainPer', rainPercent);
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
                          size="1.1rem"
                          bold="900"
                        >
                          지금
                      </Text>
                        :
                        <Text
                          size="1.1rem"
                          bold="500"
                        >
                          {time}시
                          </Text>
                      }
                    </Grid>
                    <Grid
                      height="70%"
                      ai="center"
                    >
                      <Icon
                        isWeather
                        name="rainPer"
                        color={color[iconColor]}
                        size={2}
                      />
                    </Grid>
                    <Grid
                      height="15%"
                    >
                      <Text
                        size="1.3rem"
                        bold={time === String(hours) ? '900' : '500'}
                      >
                        {rainPercent}
                      </Text>
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

  // 날씨 정보
  return (
    <>
      <ElTimeInfo>
        <Grid
          width="100%"
          height="35%"
          ai="center"
        >
          <Text
            size="1.5rem"
            bold="700"
          >
            {label}
          </Text>
        </Grid>
        {/* 날씨 정보 */}
        <Grid
          width="100%"
          height="50%"
        >
          {info.map((x, idx) => {
            if (timeIndex.includes(idx)) {
              const time: string = dailyTime[idx].split(' ')[2];
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
                        size="1.1rem"
                        bold="900"
                      >
                        지금
                    </Text>
                      :
                      <Text
                        size="1.1rem"
                        bold="500"
                      >
                        {time}시
                        </Text>
                    }
                  </Grid>
                  <Grid
                    height="70%"
                    ai="center"
                  >
                    <Icon isWeather name={weatherIcon[idx]} size={3} />
                  </Grid>
                  <Grid
                    height="15%"
                  >
                    <Text
                      size="1.3rem"
                      bold={time === String(hours) ? '900' : '500'}
                    >
                      {Math.round(x)}°
                      </Text>
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
  dayOfWeek: null,
  score: false,
  rain: false,
  height: '',
  weatherIcon: null,
}

const ElTimeInfo = styled.div`
display:flex;
flex-direction: column;
align-items: space-between;
justify-content: center;
width: 100%;
height: ${(props) => (props.height ? props.height : '20%')};
border-radius: 1.4rem;
${(props) => props.theme.shadow};
margin: 0 0 1rem 0;
background-color: white;
border: solid 0.5px ${(props) => props.theme.color.purple};

`



export default TimeInfo;