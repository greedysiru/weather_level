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
  const is_loaded = useSelector((state: RootState) => state.weather.is_loaded)

  // 사용자의 지역 정보 가져오기
  const bigRegion = useSelector((state: RootState) => state.weather.weatherInfo?.bigRegion);
  const smallRegion = useSelector((state: RootState) => state.weather.weatherInfo?.smallRegion);
  // 이번주의 최고 온도, 최저 온도, 평균 온도 가져오기
  const { maxTmp, minTmp, tmp } = useSelector((state: RootState) => state.weather.weatherInfo?.weekInfo);


  return (
    <React.Fragment >
      <Header />
    </React.Fragment >
  )
}

/* width: string;
        height: string;
        is_column: boolean;
        jc: string;
        ai: string;
        bg: string;
        margin: string;
        children: any; */

export default Main