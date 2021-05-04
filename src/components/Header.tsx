import React from 'react';

// 리덕스
import { useSelector } from 'react-redux';
// elements
import { Grid, Text } from './elements'

// RootState
import { RootState } from '../redux/modules';

// 헤더 컴포넌트
const Header = (props) => {
  // 사용자의 지역 정보 가져오기
  const { bigRegion, smallRegion } = useSelector((state: RootState) => state.weather?.weatherInfo);
  // 이번주의 날씨 정보 가져오기
  const weekInfo = useSelector((state: RootState) => state.weather.weatherInfo?.weekInfo);
  // 오늘 최대, 최저, 평균 기온
  const { maxTmp, minTmp, tmp } = weekInfo;
  // 정수화 후 반올림 하기
  const todayMaxTmp = Math.round(Number(maxTmp[0]));
  const todayMinTmp = Math.round(Number(minTmp[0]));
  const todayTmp = Math.round(Number(tmp[0]));
  return (
    <Grid
      height="10%"
      ai="center"
      width="100%"
      padding="2rem 2rem 0 2rem"
    >
      <Grid isColumn width="50%" height="100%">
        <Text size="1.8rem" >
          현재 위치
          </Text>
        <Text size="1.8rem" bold>
          {bigRegion.bigRegionName} {smallRegion.smallRegionName}
        </Text>
      </Grid>
      <Grid width="50%" ai="center" height="100%">
        <Grid
          isColumn
          width="50%"
          ai="flex-end"
          jc="center"
          height="100%"
        >
          <Text>
            {todayMaxTmp}
          </Text>
          <Text
            margin="0.5rem 0 0 0">
            {todayMinTmp}
          </Text>
        </Grid>
        <Grid
          width="50%"
          height="100%"
          jc="flex-start"
          ai="center"
        >
          <Text size="4rem">
            {todayTmp}
          </Text>
        </Grid>
          그림
        </Grid>
    </Grid>
  )
}
export default Header;