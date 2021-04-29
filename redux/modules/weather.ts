import { createReducer, createAction, PayloadAction } from '@reduxjs/toolkit';

// 날씨 정보를 관리하는 모듈

// api 가져오기
import { weatherAPI } from '../../shared/api';

// type 선언
type weatherType = {
  weatherInfo: string[];
}


export const initialState: weatherType = {
  // 날씨 정보
  weatherInfo: [],
}

// 날씨 정보를 받아오는 액션 함수
const getWeather = createAction('weather/GETWEATHER')();


const weather = createReducer(initialState, {
  [getWeather]: (state, action) => {
    state.weatherInfo = action.payload.weatherInfo;
  }
})





export default weather;