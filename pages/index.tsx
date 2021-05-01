import React from 'react';
// elements
import { Grid, Button, Image, Input, Text, Range } from '../components/elements'
// components
import Header from '../components/Header';
import Score from '../components/Score';
import MainContents from '../components/MainContents';
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
  const isLoaded = useSelector((state: RootState) => state.weather.isLoaded);

  // 날씨정보 로드 전
  if (!isLoaded) {
    return null

  }
  // 날씨정보 로드 후
  else {
    return (
      <React.Fragment >
        <Grid
          is_column width="100%"
          height="100%"
          jc="flex-start"
        >
          {/* 헤더 */}
          <Header />
          {/* 점수 */}
          <Score />
          {/* 카드 (4열) */}
          <MainContents />
        </Grid>
      </React.Fragment >
    )
  }
}

export default Main