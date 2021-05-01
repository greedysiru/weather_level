import React from 'react';

// elements
import { Grid, Text } from './elements'


// 리덕스
import { useSelector } from 'react-redux';

// RootState
import { RootState } from '../redux/modules';

// 헤더 컴포넌트
const Header = (props) => {
  // 사용자의 지역 정보 가져오기
  const region = useSelector((state: RootState) => state.weather.weatherInfo?.region);
  // 이번주의 날씨 정보 가져오기
  const weekInfo = useSelector((state: RootState) => state.weather.weatherInfo?.weekInfo);
  // 사용자의 현재 지역 정보
  const { bigRegion, smallRegion } = region;
  // 오늘 최대, 최저, 평균 기온
  let { maxTmp, minTmp, tmp } = weekInfo;
  // 정수화 후 반올림 하기
  const todayMaxTmp = Math.round(Number(maxTmp[0]));
  const todayMinTmp = Math.round(Number(minTmp[0]));
  const todayTmp = Math.round(Number(tmp[0]));
  return (
    <React.Fragment>
      <Grid height="5%" ai="center" width="100%" margin="0 0 1rem 0" >
        <Grid is_column width="50%" height="100%">
          <Text size="1.8rem" >
            현재 위치
          </Text>
          <Text size="1.8rem" bold>
            {bigRegion} {smallRegion}
          </Text>
        </Grid>
        <Grid width="50%" ai="center" height="100%">
          <Grid
            is_column
            width="50%"
            ai="flex-end"
            height="100%"
          >
            <Text>
              {todayMaxTmp}
            </Text>
            <Text margin="0.5rem 0 0 0">
              {todayMinTmp}
            </Text>
          </Grid>
          <Grid
            width="50%"
            height="100%"
            jc="flex-start"
            ai="flex-end"
          >
            <Text size="4rem">
              {todayTmp}
            </Text>
          </Grid>
          그림
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
export default Header;