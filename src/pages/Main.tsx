import React from 'react';
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
// import Swiper core and required modules
import SwiperCore, { Pagination } from 'swiper/core';
// Swipter styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
// 리덕스
import { useSelector } from 'react-redux';

// elements
import { Grid, Button, Image, Input, Text, Range } from '../components/elements'

// components
import Header from '../components/Header';
import Score from '../components/Score';
import MainContents from '../components/MainContents';
import Footer from '../components/Footer';

// RootState
import { RootState } from '../redux/modules';

// install Swiper modules
SwiperCore.use([Pagination]);

const Main = (props) => {

  // 날씨 정보 로드 여부 가져오기
  const isLoaded = useSelector((state: RootState) => state.weather.isLoaded);

  // 날씨정보 로드 전
  if (!isLoaded) {
    return null

  }
  // 날씨정보 로드 후
  return (
    <>
      <Grid
        isColumn
        width="100%"
        height="100%"
        jc="flex-start"
      >
        {/* 헤더 height: 10% */}
        <Header />
        <Swiper
          pagination className="mySwiper"
          style={{
            width: '100%',
            height: '80%',
          }}
        >
          {/* 첫번째 슬라이드 */}
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
            <MainContents isFirst />
          </SwiperSlide>
          {/* 두번째 슬라이드 */}
          <SwiperSlide
            style={{
              width: '100%',
              height: '100%',
            }}
          >
            {/* 카드 (4열) */}
            <MainContents />
          </SwiperSlide>
        </Swiper>
        <Footer />
        {/* <Grid height="4%" ai="center">
            공백
          </Grid> */}
      </Grid>
    </>
  )

  return null;
}

export default Main;