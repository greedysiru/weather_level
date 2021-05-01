import { createReducer, createAction, PayloadAction } from '@reduxjs/toolkit';

// 날씨 정보를 관리하는 모듈

// api 가져오기
import { weatherAPI } from '../../shared/api';

// type 선언
// 초기 상태 type
type weatherType = {
  weatherInfo: {
    region?: {
      bigRegion: string;
      smallRegion: string;
      longitude: string;
      latitude: string;
    }
    livingHealthWeather?: {
      uvToday: string;
      uvTomorrow: string;
      uvTheDayAfterTomorrow: string;
      oakPollenRiskToday: string;
      oakPollenRiskTomorrow: string;
      oakPollenRiskTheDayAfterTomorrow: string;
      pinePollenRiskToday: string;
      pinePollenRiskTomorrow: string;
      pinePollenRiskTheDayAfterTomorrow: string;
      coldToday: string;
      coldTomorrow: string;
      coldTheDayAfterTomorrow: string;
      foodPoisonToday: string;
      foodPoisonTomorrow: string;
      foodPoisonTheDayAfterTomorrow: string;
      asthmaToday: string;
      asthmaTomorrow: string;
      asthmaTheDayAfterTomorrow: string;
    };
    weekInfo?: {
      maxTmp: string[];
      minTmp: string[];
      tmp: string[];
      humidity: string[];
      weather: string[];
      weatherDes: string[];
      rainPer: string[];
    };
    dayInfo?: {
      tmp: string[];
      weather: string[];
      rainPer: string[];
      weatherDes: string[];
      dailyTime: string[]
    }
    airPollution?: {
      id: number;
      dateTime: string;
      pm10Value: number;
      pm25Value: number;
    };
    corona?: {
      id: number;
      bigRegion: string;
      date: string;
      pm10Value: number,
      pm25Value: number
    }
  };
  // 날씨 정보 로드 상태
  is_loaded: boolean;
}


export const initialState: weatherType = {
  // 날씨 정보
  weatherInfo: null,
  // 날씨 정보 로드 상태
  is_loaded: false,
}

// 날씨 정보를 받아오는 액션 함수
const getWeather = createAction<object>('weather/GETWEATHER');
// 현재 위치를 가져오는 액션 함수
// const getPosition = createAction<object>('weather/GETPOSITION');
// 로드 상태를 변경하는 함수
const setLoad = createAction<boolean>('weather/SETLOAD');

const weather = createReducer(initialState, {
  [getWeather.type]: (state: weatherType, action: PayloadAction<object>) => {
    state.weatherInfo = action.payload;
  },
  [setLoad.type]: (state: weatherType, action: PayloadAction<boolean>) => {
    state.is_loaded = action.payload;
  },
  // [getPosition.type]: (state: weatherType, action: PayloadAction<{ latitude: number, longitude: number }>) => {
  //   state.latitude = action.payload.latitude;
  //   state.longitude = action.payload.longitude;
  // },
})

// 날씨 정보 호출 후 리덕스 state에 저장
const getWeatherInfo = (latitude: number, longitude: number) => async (dispatch) => {
  try {
    const res = await weatherAPI.getWeather(latitude, longitude);
    dispatch(getWeather(res.data));
    // 로드 상태 ture(로딩 완료)
    dispatch(setLoad(true))
  }
  catch (error) {
    console.log(error)
  }
};

// 위도, 경도 정보 가져오는 함수
const getLocation = () => (dispatch) => {
  // GPS를 지원하면
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      // GPS 정보 제공을 허용한 경우
      function (position) {
        // 현재 사용자 위치의 위도, 경도 정보를 가져오기
        const latitude: number = position.coords.latitude
        const longitude: number = position.coords.longitude
        // 현재 위치정보를 기반으로 날씨 정보 불러오기
        dispatch(getWeatherInfo(latitude, longitude));
      },
      // error
      function (error) {
        alert('위치 정보 제공을 허용해주세요.');
        console.log(error);
      });
  } else {
    alert('GPS를 지원하지 않습니다.')
  }
}


export const weatherActions = {
  getWeatherInfo,
  getLocation,
}

export default weather;