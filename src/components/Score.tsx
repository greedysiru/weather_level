import React from 'react';
// 리덕스
import { useSelector } from 'react-redux';
// RootState
import { RootState } from '../redux/modules';
// elements
import { Grid, Text, Image } from './elements';

import theme from '../styles/theme';

// 외출 점수와 캐릭터를 보여주는 컴포넌트
const Score = (props) => {
  const weather = '/assets/weather/11d.png';
  const { color } = theme;
  const todayScore = useSelector((state: RootState) => state.weather.weatherInfo?.dayScoreList[0]);
  const todayWeather = useSelector((state: RootState) => state.weather.todayWeather);
  const { hours } = useSelector((state: RootState) => state.time);
  // file url
  const fileUrl = '';
  // if (hours >= 19){
  //   fileUrl = ''
  // }
  // file
  return (
    <>
      <Grid
        isColumn
        padding="0 2rem 2rem 2rem"
        height="49%"
        jc="flex-start"
        ai="center"
      >
        <Image
          size={240}
          src={weather}
        />
        <Grid
          isColumn
          width="100%"

          ai="center"
        >
          <Grid
            ai="center"
          >
            <Text
              size="1.6rem"
              margin="0 0.5rem 0 0"
              bold="700"
            >
              외출 점수
            </Text>
            <Text
              size="2.2rem"
              bold="700"
            >
              {todayScore}점
          </Text>
          </Grid>
          <Grid
            margin="0.5rem 0 0 0"
          >
            <Text
              size="1.4rem"
              color={color.gray3}
            >
              오늘 날씨는 {todayWeather[1]}
            </Text>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
export default Score;