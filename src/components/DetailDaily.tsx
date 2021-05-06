import React from 'react';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper core and required modules
import SwiperCore, { Pagination } from 'swiper/core';
// Swipter styles
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/modules';

const DetailDaily = (props) => {
  const { category } = props;
  // category : rainPer, tmp, weather
  const state = useSelector((state: RootState) => state.weather.weatherInfo?.dayInfo);
  console.log(state);
  return <div>{category}</div>;
};

export default DetailDaily;
