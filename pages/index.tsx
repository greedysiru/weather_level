import React from 'react';
// elements
import { Grid, Button, Image, Input, Text, Range } from '../components/elements'
// components
import Header from '../components/Header'
// 날씨 관련 모듈
import { weatherActions } from '../redux/modules/weather';

// 리덕스
import { useDispatch, useSelector } from 'react-redux';

// RootState
import { RootState } from '../redux/modules';

const Main = (props) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    // 사용자 위치(위도, 경도) state에 기록 후 날씨 정보 불러오기
    dispatch(weatherActions.getLocation());
  }, [])
  // 날씨 정보 로드 여부 가져오기
  const is_loaded = useSelector((state: RootState) => state.weather.is_loaded);

  // 사용자의 지역 정보 가져오기
  const bigRegion = useSelector((state: RootState) => state.weather.weatherInfo?.bigRegion);
  const smallRegion = useSelector((state: RootState) => state.weather.weatherInfo?.smallRegion);
  // 이번주의 날씨 정보 가져오기
  const weekInfo = useSelector((state: RootState) => state.weather.weatherInfo?.weekInfo);
  // 날씨정보 로드 전
  if (!is_loaded) {
    return null

  }
  // 날씨정보 로드 후
  else {
    return (
      <React.Fragment >
        <Header
          // 현재 사용자의 위치정보
          bigRegion={bigRegion}
          smallRegion={smallRegion}
          // 오늘의 최대, 최소, 평균 기온
          todayMaxTmp={weekInfo?.maxTmp[0]}
          todayMinTmp={weekInfo?.minTmp[0]}
          todayTmp={weekInfo?.tmp[0]}
        />
      </React.Fragment >
    )
  }
}

export default Main