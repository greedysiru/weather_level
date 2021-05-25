import React, { useRef } from 'react';
// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper core and required modules
import SwiperCore, { Pagination, History } from 'swiper/core';
// Swipter styles
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';

import styled from 'styled-components';

// 리덕스
import { useSelector } from 'react-redux';

// page
import PreSetting from './PreSetting';

// elements
import { Grid, Button, Image, Input, Text, Range } from '../components/elements';

// components
import Header from '../components/Header';
import Score from '../components/Score';
import MainContents from '../components/MainContents';
import Logo from '../components/Logo';

// RootState
import { RootState } from '../redux/modules';

// install Swiper modules
SwiperCore.use([Pagination, History]);

const Main = (props) => {
  const { history } = props;
  const swipe = useRef(null);
  // 날씨 정보 로드 여부 가져오기
  const isLoaded = useSelector((state: RootState) => state.weather.isLoaded);
  const isDesktopMode = useSelector((state: RootState) => state.common.isDesktopMode);

  // 날씨정보 로드 전
  if (!isLoaded) {
    return <Logo />;
  }
  const mySwiper = document.querySelector('.mySwiper');
  console.log('my', mySwiper);
  const swiperEvent = (s) => {};

  const onSwiper = (swiper) => {
    console.log(swiper.translate);
    setTimeout(() => {
      swiper.translateTo(0, 1, true, true);

      console.log('힝');
    }, 1000);
  };

  // 날씨정보 로드 후
  // 데스크탑 모드
  if (isDesktopMode) {
    return (
      <Grid isColumn height="90%" ai="center" padding="2rem 0">
        <Grid height="100%" padding="0 2rem 0 2rem">
          <Grid width="30%" height="100%">
            <MainContents />
          </Grid>
          <Grid isColumn width="30%" height="100%">
            <Grid ai="center">
              <Header />
            </Grid>
            <Score history={history} />
            <MainContents isFirst />
          </Grid>

          <Grid width="30%" height="100%" isColumn jc="center">
            {/* <Button _onClick={() => history.push('/setting/preference')}>나만의 외출 난이도 설정하러 가기</Button>
            <Button _onClick={() => history.push('/setting/location')}>위치 설정하러 가기</Button> */}
            <PreSetting isMain />
          </Grid>
        </Grid>
      </Grid>
    );
  }
  return (
    <>
      <Grid isColumn width="100%" height="100%" jc="flex-start">
        {/* 헤더 height: 10% */}
        <Header />
        <Swiper
          pagination={{ clickable: true }} //*
          /* onSwiper={onSwiper} */
          className="mySwiper"
          style={{
            width: '100%',
            height: '80%',
          }}
          onSlideChange={onSwiper}
        >
          {/* 첫번째 슬라이드 */}
          <SwiperSlide
            style={{
              width: '100%',
              height: '100%',
              padding: '0 2rem 0 2rem',
            }}
          >
            {/* 점수 */}
            <Score history={history} />
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
          {/* 세번째 슬라이드 */}
          {/* preference */}
          <SwiperSlide
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
              padding: '2rem 2rem 0 2rem',
            }}
          >
            <PreSetting isMain />
            <PagenationWrap />
          </SwiperSlide>
        </Swiper>
      </Grid>
    </>
  );
};

const PagenationWrap = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 6%;
  z-index: 1;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.47) 0%, #ffffff 100%);
`;

export default Main;
