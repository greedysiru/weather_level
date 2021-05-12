import React from 'react';
// 리덕스
import { useSelector } from 'react-redux';
// RootState
import { RootState } from '../redux/modules';
// elements
import { Grid, Text, Image, Icon } from './elements';

import theme from '../styles/theme';

// 외출 점수와 캐릭터를 보여주는 컴포넌트
const Score = (props) => {
  const { history } = props;
  const { color } = theme;
  const todayScore = useSelector((state: RootState) => state.weather.weatherInfo?.dayScoreList[0]);
  const todayWeather = useSelector((state: RootState) => state.weather.todayWeather);
  // 날씨 이미지를 불러올 경로
  const imgUrl = `/assets/weather/${todayWeather[3]}.png`;
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
          src={imgUrl}
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
              날씨 점수
            </Text>
            <Text
              size="2.2rem"
              bold="700"
            >
              {todayScore}점
          </Text>
            <Grid width="10%" _onClick={() => { history.replace('/setting?slected') }} >
              <Icon name="adjust" color="black" />
            </Grid>
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