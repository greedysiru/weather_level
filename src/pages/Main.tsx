import React from 'react';
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
// import Swiper core and required modules
import SwiperCore, { Pagination } from 'swiper/core';
// Swipter styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";

import styled from 'styled-components';

// 리덕스
import { useSelector } from 'react-redux';


// elements
import { Grid, Button, Image, Input, Text, Range } from '../components/elements'

// components
import Header from '../components/Header';
import Score from '../components/Score';
import MainContents from '../components/MainContents';

// RootState
import { RootState } from '../redux/modules';



// install Swiper modules
SwiperCore.use([Pagination]);

const Main = (props) => {
  const { history } = props;
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
        <Grid
          width='100%'
          height='2rem'
        />
        {/* 헤더 height: 10% */}
        <Header />
        <Swiper
          pagination className="mySwiper"
          style={{
            width: '100%',
            height: '78%',
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
            <PagenationWrap />
          </SwiperSlide>
        </Swiper>
      </Grid>
    </>
  )
}

const PagenationWrap = styled.div`
  position: fixed;
  bottom:0;
  width: 100%;
  height: 6%;
  z-index: 1;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.47) 0%, #FFFFFF 100%);

`

export default Main;