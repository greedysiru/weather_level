import React, { useState } from 'react';

import styled from 'styled-components';
// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper core and required modules
import SwiperCore, { Pagination } from 'swiper/core';
// Swipter styles
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/modules';
import { Grid, LongCard } from './elements';

// common
import { convertWeaterInfo } from '../shared/common';

SwiperCore.use([Pagination]);

const DetailDaily = (props) => {
  const { category } = props;
  const { dayInfo, weekInfo } = useSelector((state: RootState) => state.weather.weatherInfo);
  const dayOfWeek = useSelector((state: RootState) => state.time.dayOfWeek);
  const isDesktopMode = useSelector((state: RootState) => state.common.isDesktopMode);
  // 현재 시간을 기준으로 시작하는 인덱스
  const timeStartIndex = useSelector((state: RootState) => state.time.timeIndex[0]);
  // url에 따라 title 다르게
  const title = {
    weather: '날씨',
    rainPer: '강수확률',
    tmp: '날씨',
  };

  // 시간별 카드 리스트 컴포넌트
  const timeListComponent = dayInfo.dailyTime.reduce((acc, cur, idx) => {
    if (idx >= timeStartIndex) {
      // 2시간 간격 24시간: idx < 20 && (idx + 1) % 2 === 1
      // 현재로부터 1시간 단위로 10시간 치 보여주기
      if (acc.length <= 23) {
        const dateTime = cur.split(' ');
        // category 별로 데이터 다르게
        let data;
        let iconColor;
        let iconName;
        if (category === 'rainPer') {
          const rainPercent = Math.round(Number(dayInfo[category][idx]) * 100);
          data = `${rainPercent}`;
          iconColor = convertWeaterInfo(category, rainPercent);
        }

        if (category === 'tmp' || category === 'weather') {
          data = `${Math.round(Number(dayInfo.tmp[idx]))}°C`;
          iconName = dayInfo.weatherIcon[idx];
        }

        acc.push(
          <LongCard
            height="7%"
            type={category}
            key={idx}
            day={`${dateTime[2]}:00`} /* ${dateTime[0]}/${dateTime[1]} */
            data={data}
            iconColor={iconColor}
            iconName={iconName}
            isTime
          />,
        );
        // 카드 넣었을 때마다 1씩 더하기
      }
    }
    return acc;
  }, []);

  // 일별 카드리스트 컴포넌트
  const weeklyListComponent = weekInfo[category].reduce((acc, cur, idx) => {
    // category 별로 데이터 다르게
    let data;
    let iconColor;
    if (category === 'rainPer') {
      const rainPercent = Math.round(Number(weekInfo[category][idx]) * 100);
      data = `${rainPercent}`;
      iconColor = convertWeaterInfo(category, rainPercent);
    }

    if (category === 'tmp' || category === 'weather') {
      data = {
        max: `${Math.round(Number(weekInfo.maxTmp[idx]))}°C`,
        min: `${Math.round(Number(weekInfo.minTmp[idx]))}°C`,
        tmp: `${parseInt(weekInfo.tmp[idx], 10)}°C`,
        weather: weekInfo.weatherIcon[idx],
        des: weekInfo.weatherDes[idx],
      };
    }

    acc.push(
      <LongCard
        height="9%"
        isFirst={idx === 0}
        type={category}
        key={idx}
        day={dayOfWeek[idx]}
        data={data}
        iconColor={iconColor}
      />,
    );

    return acc;
  }, []);
  const swipeStyle = {
    width: '100%',
    height: '100%',
  };
  const slideStyle = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: '1.5rem 1.5rem 2rem 1.5rem',
  };
  if (isDesktopMode) {
    return (
      <Grid height="80%">
        <Grid isColumn margin="0 1.5rem" width="50%" jc="space-between" ai="center" height="100%">
          <Title>시간별 {title[category]} </Title>
          <Grid isColumn height="100%" overFlow jc="start-flex">
            {timeListComponent}
          </Grid>
        </Grid>
        <Grid isColumn margin="0 1.5rem" width="50%" jc="space-between" ai="center" height="100%">
          <Title> 일별 {title[category]} </Title>
          {weeklyListComponent}
        </Grid>
      </Grid>
    );
  }
  return (
    <Container>
      <Swiper pagination className="mySwiper" style={swipeStyle as React.CSSProperties}>
        {/* 첫번째 슬라이드 */}

        <SwiperSlide style={slideStyle as React.CSSProperties}>
          <Title>시간별 {title[category]} </Title>
          <Grid isColumn height="100%" overFlow jc="start-flex">
            {timeListComponent}
          </Grid>
        </SwiperSlide>

        {/* 두번째 슬라이드 */}

        <SwiperSlide style={slideStyle as React.CSSProperties}>
          <Title> 일별 {title[category]} </Title>
          {weeklyListComponent}
        </SwiperSlide>
      </Swiper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  ${(props) => props.theme.flex.column};
  justify-content: space-around;
`;

const Title = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  margin: 1rem;
`;

export default DetailDaily;
