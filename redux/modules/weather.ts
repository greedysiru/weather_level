import { createReducer, createAction, PayloadAction } from '@reduxjs/toolkit';

// 날씨 정보를 관리하는 모듈

// api 가져오기
import { weatherAPI } from '../../shared/api';

// type 선언
// 초기 상태 type
type weatherType = {
  weatherInfo: object;
  // 위도, 경도
  latitude: number;
  longitude: number;
}


export const initialState: weatherType = {
  // 날씨 정보
  weatherInfo: null,
  latitude: null,
  longitude: null,
}

// 날씨 정보를 받아오는 액션 함수
const getWeather = createAction<object>('weather/GETWEATHER');
// 현재 위치를 가져오는 액션 함수
const getPosition = createAction('weather/GETPOSITION');

const weather = createReducer(initialState, {
  [getWeather.type]: (state: weatherType, action: PayloadAction<object>) => {
    state.weatherInfo = action.payload;
  }
})

// 날씨 정보 호출 후 리덕스 state에 저장
const getWeatherInfo = () => async (dispatch) => {
  try {
    const res = await weatherAPI.getWeather(37.6027, 126.9291);
    dispatch(getWeather(res.data));
  }
  catch (error) {
    console.log(error)
  }
};


export const weatherActions = {
  getWeatherInfo,
}

export default weather;