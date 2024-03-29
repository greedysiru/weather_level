import React from 'react';

// 리덕스
import { useSelector } from 'react-redux';
// elements
import { Grid, Text } from './elements'

// RootState
import { RootState } from '../redux/modules';

import theme from '../styles/theme';

// 헤더 컴포넌트
const Header = (props) => {
  // 사용자의 지역 정보 가져오기
  const { bigRegionName, smallRegionName } = useSelector((state: RootState) => state.weather?.weatherInfo.region);
  // 이번주의 날씨 정보 가져오기
  const weekInfo = useSelector((state: RootState) => state.weather.weatherInfo?.weekInfo);
  // 오늘 최대, 최저, 평균 기온
  const { maxTmp, minTmp } = weekInfo;
  // 현재 시간의 index
  const curTimeIndex = useSelector((state: RootState) => state.time.timeIndex[0])
  // 현재 기온
  let curTmp: number | string = useSelector((state: RootState) => state.weather.weatherInfo.dayInfo.tmp[curTimeIndex])
  // 테마 색상
  const { color } = theme;
  // 정수화 후 반올림 하기
  const todayMaxTmp = Math.round(Number(maxTmp[0]));
  const todayMinTmp = Math.round(Number(minTmp[0]));
  curTmp = Math.round(Number(curTmp));
  return (
    <Grid
      height="10%"
      ai="center"
      width="100%"
      padding="0 2rem 0 2rem"
    >
      <Grid isColumn width="50%" height="100%">
        <Text size="1.6rem" >
          현재 위치
          </Text>
        <Text size="1.6rem" bold="700" margin="0.5rem 0 0 0">
          {bigRegionName} {smallRegionName}
        </Text>
      </Grid>
      <Grid width="50%" ai="center" jc='flex-end' height="100%">
        <Grid
          width="35%"
          height="100%"
          jc="flex-end"
          ai="center"
        >
          <Grid
            isColumn
            width="14%"
            ai="center"
            jc="space-between"
            height="44%"
            margin="0 0.5rem 0 0"
          >
            <Text
              color={color.veryBad}
              bold="700"
            >
              {todayMaxTmp}
            </Text>
            <Text
              bold="700"
              color={color.good}
              margin="0.5rem 0 0 0">
              {todayMinTmp}
            </Text>
          </Grid>
          <Grid margin="0 0 0 8px">
            <Text size="4.4rem">
              {curTmp}
            </Text>
            <Text size="4.4rem" bold="900">°</Text>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
export default Header;