import React from 'react';
// elements
import { Grid, Button, Image, Input, Text, Range } from '../components/elements'

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
// Swipter styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
// import Swiper core and required modules
import SwiperCore, { Pagination } from 'swiper/core';
// install Swiper modules
SwiperCore.use([Pagination]);

// components
import Header from '../components/Header';
import Score from '../components/Score';
import MainContents from '../components/MainContents';
import Footer from '../components/Footer';
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
          is_column
          width="100%"
          height="100%"
          jc="flex-start"
        >
          {/* 헤더 */}
          <Header />
          <Swiper
            pagination={true} className="mySwiper"
            style={{
              width: '100%',
              height: '75%',
              display: 'flex',
              flexDirection: 'column-reverse',
            }}
          >
            <SwiperSlide
              style={{
                width: '100%',
                height: '100%',
                padding: '2rem 2rem 0 2rem',
              }}
            >
              {/* 점수 */}
              <Score />
              {/* 카드 (4열) */}
              <MainContents />
            </SwiperSlide>

          </Swiper>
          <Grid
            height="5%"
            margin="1rem 0 0 0"
            padding="0 2rem"
          >
            <Footer />
          </Grid>
          {/* <Grid height="4%" ai="center">
            공백
          </Grid> */}
        </Grid>
      </React.Fragment >
    )
  }
}

export default Main