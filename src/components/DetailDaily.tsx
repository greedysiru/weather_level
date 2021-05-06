import React from 'react';

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
import { LongCard } from './elements';

SwiperCore.use([Pagination]);

const DetailDaily = (props) => {
  const { category } = props;

  const { dayInfo, weekInfo } = useSelector((state: RootState) => state.weather.weatherInfo);
  const dayOfWeek = useSelector((state: RootState) => state.time.dayOfWeek);

  const timeListComponent = dayInfo.dailyTime.reduce((acc, cur, idx) => {
    // 2시간 간격 24시간
    if (idx < 24 && (idx + 1) % 2 === 1) {
      const dateTime = cur.split(' ');
      // category 별로 데이터 다르게
      let data;
      if (category === 'rainPer') {
        data = `${Math.round(Number(dayInfo[category][idx]) * 100)}%`;
      }

      if (category === 'tmp' || category === 'weather') {
        data = `${dayInfo.tmp[idx]}°C`;
      }

      acc.push(<LongCard type="etc" key={idx} day={`${dateTime[0]}/${dateTime[1]} ${dateTime[2]}시`} data={data} />);
    }

    return acc;
  }, []);

  const weeklyListComponent = weekInfo[category].reduce((acc, cur, idx) => {
    // category 별로 데이터 다르게
    let data;
    if (category === 'rainPer') {
      data = `${Math.round(Number(weekInfo[category][idx]) * 100)}%`;
    }

    if (category === 'tmp' || category === 'weather') {
      data = {
        max: weekInfo.maxTmp[idx].toString(),
        min: weekInfo.minTmp[idx],
        tmp: `${parseInt(weekInfo.tmp[idx], 10)}°C`,
        weather: weekInfo.weather[idx],
        des: weekInfo.weatherDes[idx],
      };
    }

    acc.push(<LongCard type={category === 'rainPer' ? 'etc' : 'weather'} key={idx} day={dayOfWeek[idx]} data={data} />);

    return acc;
  }, []);
  const slideStyle = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '1rem 0',
    boxSizing: 'border-box',
  };

  const title = {
    weather: '날씨',
    rainPer: '강수확률',
    tmp: '날씨',
  };
  return (
    <Container>
      <Swiper pagination className="mySwiper" style={slideStyle as React.CSSProperties}>
        {/* 첫번째 슬라이드 */}

        <SwiperSlide style={slideStyle as React.CSSProperties}>
          <Title>시간별 {title[category]} </Title>
          {timeListComponent}
        </SwiperSlide>

        {/* 두번째 슬라이드 */}

        <SwiperSlide style={slideStyle as React.CSSProperties}>
          <Title>주간 {title[category]} </Title>
          {weeklyListComponent}
        </SwiperSlide>
      </Swiper>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  width: 100%;
  ${(props) => props.theme.flex.column};
  justify-content: center;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 1rem;
`;

export default DetailDaily;
