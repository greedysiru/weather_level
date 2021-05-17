import React from 'react';

import styled from 'styled-components';
// 리덕스
import { useSelector, useDispatch } from 'react-redux';
import { weatherActions } from '../redux/modules/weather';

// RootState
import { RootState } from '../redux/modules';
// elements
import { Grid, Text, Image, Icon, SpeechBubble } from './elements';

import theme from '../styles/theme';

// common
import { convertWeaterInfo } from '../shared/common';

// 외출 점수와 캐릭터를 보여주는 컴포넌트
const Score = (props) => {
  const dispatch = useDispatch();
  const { history } = props;
  const { color } = theme;
  const todayScore = useSelector((state: RootState) => state.weather.weatherInfo?.dayScoreList[0]);
  // 현재 시간에 대한 index
  const nowIndex = useSelector((state: RootState) => state.time.timeIndex[0]);
  // 현재 시간에 대한 날씨 icon
  const nowIcon = useSelector((state: RootState) => state.weather.weatherInfo.dayInfo.weatherIcon[nowIndex]);
  // 현재 시간에 대한 날씨 정보
  const nowWeatherInfo = useSelector((state: RootState) => state.weather.weatherInfo.dayInfo.weatherDes[nowIndex]);
  // 오늘 날씨에 대한 문구
  const todayWeatherLabel = useSelector((state: RootState) => state.weather.todayWeather[1]);
  // 현재 시간에 대한 날씨 문구
  const weatherDescripton = convertWeaterInfo('weather', nowWeatherInfo);
  const nowWeatherLabel = weatherDescripton[1];
  // 날씨 이미지를 불러올 경로
  const imgUrl = `/assets/weather/${nowIcon}.png`;

  const onClickLogo = () => {
    dispatch(weatherActions.getIconMessage(nowIcon));
  };
  return (
    <>
      <Grid isColumn padding="0 2rem 2rem 2rem" height="52%" jc="flex-start" ai="center">
        <Grid width="24rem" height="24rem" _onClick={onClickLogo}>
          <ImageWrapper>
            <Image size={24} src={imgUrl} />
          </ImageWrapper>
          <SpeechBubble />
        </Grid>
        <Grid isColumn width="100%" ai="center" jc="center" margin="0.5rem 0">
          <Grid ai="center" jc="center" width="100%">
            <Text size="1.6rem" margin="0 0.5rem 0 0" bold="700">
              날씨 점수
            </Text>
            <Text size="2.2rem" bold="700">
              {todayScore}점
            </Text>
            <Grid
              width="10%"
              _onClick={() => {
                history.push('/setting/preference');
              }}
              ai="center"
              padding="0 0 2.5px 0"
            >
              <Icon isWeather name="adjust" color="black" size={2.5} />
            </Grid>
          </Grid>
          <Grid margin="1rem 0 0 0">
            <Text size="1.6rem" color={color.gray3}>
              지금은 {nowWeatherLabel}, 오늘 날씨는 {todayWeatherLabel}
            </Text>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

const ImageWrapper = styled.div`
  cursor: pointer;
`;

export default Score;
