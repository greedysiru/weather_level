import { createReducer, createAction, PayloadAction } from '@reduxjs/toolkit';

// 날씨 정보를 관리하는 모듈

// api 가져오기
import { weatherAPI } from '../../shared/api';

// timeActions
import { timeActions } from './time';

// type 선언
// 초기 상태 type
type weatherType = {
  weatherInfo: {
    bigRegion?: {
      bigRegionName: string;
    },
    smallRegion?: {
      smallRegionName: string;
      longitude: string;
      latitude: string;
    }
    ;
    livingHealthWeather?: {
      uvToday: string;
      uvTomorrow: string;
      uvTheDayAfterTomorrow: string;
      oakPollenRiskToday: string;
      oakPollenRiskTomorrow: string;
      oakPollenRiskTheDayAfterTomorrow: string;
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
      windSpeed: string[];
      weatherIcon: string[];
    };
    dayInfo?: {
      tmp: string[];
      weather: string[];
      rainPer: string[];
      weatherDes: string[];
      dailyTime: string[];
      weatherIcon: string[];
    };
    airPollution?: {
      id: number;
      dateTime: string;
      pm10Value: number;
      pm25Value: number;
    };
    corona?: {
      id: number;
      date: string;
      newLocalCaseCount: number;
      newForeignCaseCount: number;
    };
    coronaTotalNewCaseCount?: number;
    dayScoreList?: number[];
  };
  // 날씨 정보 로드 상태
  isLoaded: boolean;


}


export const initialState: weatherType = {
  // 날씨 정보
  weatherInfo: {
        bigRegion: {
          bigRegionName: '서울특별시'
        },
        smallRegion: {
          smallRegionName: '은평구',
          longitude: '126.9312417',
          latitude: '37.59996944'
        },
        livingHealthWeather: {
          uvToday: '8',
          uvTomorrow: '4',
          uvTheDayAfterTomorrow: '8',
          oakPollenRiskToday: '1',
          oakPollenRiskTomorrow: '1',
          oakPollenRiskTheDayAfterTomorrow: '1',
          foodPoisonToday: '35',
          foodPoisonTomorrow: '36',
          foodPoisonTheDayAfterTomorrow: '44',
          asthmaToday: '2',
          asthmaTomorrow: '1',
          asthmaTheDayAfterTomorrow: '1'
        },
        weekInfo: {
          maxTmp: [
            '15.92',
            '18.6',
            '20.19',
            '17.89',
            '23.02',
            '17.99',
            '20.33',
            '20.22'
          ],
          minTmp: [
            '12.07',
            '11.48',
            '10.15',
            '12.97',
            '10.83',
            '10.48',
            '11.25',
            '12.25'
          ],
          tmp: [
            '13.44',
            '16.73',
            '19.09',
            '17.89',
            '22.25',
            '17.47',
            '18.65',
            '16.25'
          ],
          humidity: [
            '73',
            '45',
            '22',
            '37',
            '24',
            '38',
            '36',
            '50'
          ],
          weather: [
            'Rain',
            'Rain',
            'Clouds',
            'Rain',
            'Rain',
            'Clear',
            'Rain',
            'Rain'
          ],
          weatherDes: [
            'moderate rain',
            'moderate rain',
            'overcast clouds',
            'light rain',
            'light rain',
            'clear sky',
            'light rain',
            'light rain'
          ],
          rainPer: [
            '1',
            '1',
            '0',
            '1',
            '1',
            '0',
            '0.3',
            '0.62'
          ],
          windSpeed: [
            '2.76',
            '7.46',
            '3.95',
            '7.33',
            '9.29',
            '8.15',
            '4.7',
            '3.89'
          ],
          weatherIcon: [
            '10d',
            '10d',
            '04d',
            '10d',
            '10d',
            '01d',
            '10d',
            '10d'
          ]
        },
        dayInfo: {
          tmp: [
            '12.07',
            '12.56',
            '13.44',
            '14.49',
            '15.09',
            '15.92',
            '15.27',
            '15.16',
            '14.96',
            '14.92',
            '15.04',
            '14.35',
            '13.91',
            '13.69',
            '13.48',
            '13.34',
            '13.18',
            '12.93',
            '12.13',
            '11.71',
            '11.48',
            '12.25',
            '13.39',
            '14.53',
            '15.15',
            '15.98',
            '16.73',
            '18.24',
            '18.6',
            '18.22',
            '17.79',
            '16.95',
            '16.07',
            '14.8',
            '13.7',
            '13.13',
            '12.42',
            '11.91',
            '11.62',
            '11.41',
            '11.1',
            '10.8',
            '10.44',
            '10.2',
            '10.15',
            '11.27',
            '12.95',
            '14.95'
          ],
          weather: [
            'Rain',
            'Clouds',
            'Rain',
            'Rain',
            'Rain',
            'Rain',
            'Rain',
            'Rain',
            'Rain',
            'Rain',
            'Rain',
            'Rain',
            'Rain',
            'Rain',
            'Rain',
            'Rain',
            'Clouds',
            'Clouds',
            'Clouds',
            'Clouds',
            'Clouds',
            'Clouds',
            'Clouds',
            'Clouds',
            'Clear',
            'Clouds',
            'Clouds',
            'Clouds',
            'Clear',
            'Clear',
            'Clear',
            'Clear',
            'Clear',
            'Clear',
            'Clear',
            'Clear',
            'Clear',
            'Clear',
            'Clear',
            'Clear',
            'Clear',
            'Clear',
            'Clear',
            'Clear',
            'Clear',
            'Clouds',
            'Clouds',
            'Clouds'
          ],
          weatherDes: [
            'light rain',
            'overcast clouds',
            'light rain',
            'light rain',
            'light rain',
            'light rain',
            'moderate rain',
            'moderate rain',
            'moderate rain',
            'moderate rain',
            'moderate rain',
            'moderate rain',
            'moderate rain',
            'moderate rain',
            'moderate rain',
            'light rain',
            'overcast clouds',
            'overcast clouds',
            'overcast clouds',
            'overcast clouds',
            'overcast clouds',
            'broken clouds',
            'broken clouds',
            'scattered clouds',
            'clear sky',
            'few clouds',
            'few clouds',
            'few clouds',
            'clear sky',
            'clear sky',
            'clear sky',
            'clear sky',
            'clear sky',
            'clear sky',
            'clear sky',
            'clear sky',
            'clear sky',
            'clear sky',
            'clear sky',
            'clear sky',
            'clear sky',
            'clear sky',
            'clear sky',
            'clear sky',
            'clear sky',
            'scattered clouds',
            'scattered clouds',
            'scattered clouds'
          ],
          rainPer: [
            '0.64',
            '0.66',
            '0.66',
            '0.7',
            '0.7',
            '0.78',
            '0.96',
            '0.98',
            '0.96',
            '0.96',
            '1',
            '1',
            '1',
            '1',
            '1',
            '1',
            '0.8',
            '0.8',
            '0',
            '0',
            '0',
            '0',
            '0',
            '0',
            '0',
            '0',
            '0',
            '0',
            '0',
            '0',
            '0',
            '0',
            '0',
            '0',
            '0',
            '0',
            '0',
            '0',
            '0',
            '0',
            '0',
            '0',
            '0',
            '0',
            '0',
            '0',
            '0',
            '0'
          ],
          dailyTime: [
            '05 04 01',
            '05 04 02',
            '05 04 03',
            '05 04 04',
            '05 04 05',
            '05 04 06',
            '05 04 07',
            '05 04 08',
            '05 04 09',
            '05 04 10',
            '05 04 11',
            '05 04 12',
            '05 04 13',
            '05 04 14',
            '05 04 15',
            '05 04 16',
            '05 04 17',
            '05 04 18',
            '05 04 19',
            '05 04 20',
            '05 04 21',
            '05 04 22',
            '05 04 23',
            '05 05 00',
            '05 05 01',
            '05 05 02',
            '05 05 03',
            '05 05 04',
            '05 05 05',
            '05 05 06',
            '05 05 07',
            '05 05 08',
            '05 05 09',
            '05 05 10',
            '05 05 11',
            '05 05 12',
            '05 05 13',
            '05 05 14',
            '05 05 15',
            '05 05 16',
            '05 05 17',
            '05 05 18',
            '05 05 19',
            '05 05 20',
            '05 05 21',
            '05 05 22',
            '05 05 23',
            '05 06 00'
          ],
          weatherIcon: [
            '10d',
            '04d',
            '10d',
            '10d',
            '10d',
            '10d',
            '10d',
            '10d',
            '10d',
            '10d',
            '10n',
            '10n',
            '10n',
            '10n',
            '10n',
            '10n',
            '04n',
            '04n',
            '04n',
            '04n',
            '04d',
            '04d',
            '04d',
            '03d',
            '01d',
            '02d',
            '02d',
            '02d',
            '01d',
            '01d',
            '01d',
            '01d',
            '01d',
            '01d',
            '01n',
            '01n',
            '01n',
            '01n',
            '01n',
            '01n',
            '01n',
            '01n',
            '01n',
            '01n',
            '01d',
            '03d',
            '03d',
            '03d'
          ]
        },
        airPollution: {
          id: 25,
          dateTime: '2021-05-04T11:00:00',
          pm10Value: 17,
          pm25Value: 17
        },
        corona: {
          id: 18,
          date: '2021-05-03',
          newLocalCaseCount: 123,
          newForeignCaseCount: 4
        },
        coronaTotalNewCaseCount: 488,
        dayScoreList: [
          52,
          58,
          82,
          58,
          58,
          76,
          76
        ]
      }
  ,
  // 날씨 정보 로드 상태
  isLoaded: false,
}

// 날씨 정보를 받아오는 액션 생성 함수
const setWeatherInfo = createAction<unknown>('weather/SETWEATHERINFO');
// 현재 위치를 가져오는 액션 함수
// const getPosition = createAction<Object>('weather/GETPOSITION');
// 로드 상태를 변경하는 액션 생성 함수
const setLoad = createAction<boolean>('weather/SETLOAD');


const weather = createReducer(initialState, {
  [setWeatherInfo.type]: (state: weatherType, action: PayloadAction<unknown>) => {
    state.weatherInfo = action.payload;
  },
  [setLoad.type]: (state: weatherType, action: PayloadAction<boolean>) => {
    state.isLoaded = action.payload;
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

    dispatch(setWeatherInfo(res.data));
    // 현재 시간 기록하기
    dispatch(timeActions.getTimeInfo());
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

        const { latitude, longitude } = position.coords
        console.log(latitude, longitude)
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


type preferenceType = {
  coronaRange: string,
  pm10Range: string,
  pm24Range: string,
  tempRange: string,
  rainPerRange: string,
  weatherRange: string,
  humidityRange: string,
  windRange: string,
  uvRange: string,
  pollenRiskRange: string,
  asthmaRange: string,
  foodPoisonRange: string
}

// setting preference 생성
const fetchCreatePreference = (id: string, data: preferenceType) => async (dispatch, getState, { history }) => {
  try {
    const res = await weatherAPI.createPreference(id, data);
    console.log(res)
    // 회원가입 페이지에서 벨리데이션 표시
    // dispatch(setIsValidEmailMultiple(true));
  } catch (error) {
    // 에러페이지로 이동??
    console.error(error)
  }
};

const fetchUpdatePreference = (id: string, data: preferenceType) => async (dispatch, getState, { history }) => {
  try {
    const res = await weatherAPI.updatePreference(id, data);
    console.log(res)
    // 회원가입 페이지에서 벨리데이션 표시
    // dispatch(setIsValidEmailMultiple(true));
  } catch (error) {
    // 에러페이지로 이동?
    console.error(error)
  }
};

const fetchPreference = () => async (dispatch, getState, { history }) => {
  try {
    const res = await weatherAPI.fetchPreference();
    console.log(res)
    // 회원가입 페이지에서 벨리데이션 표시
    // dispatch(setIsValidEmailMultiple(true));
  } catch (error) {
    // 에러페이지로 이동?
    console.error(error)
  }
};

export const weatherActions = {
  getWeatherInfo,
  getLocation,
  fetchCreatePreference,
  fetchUpdatePreference,
  fetchPreference
}

export default weather;