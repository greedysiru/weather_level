import { createReducer, createAction, PayloadAction } from '@reduxjs/toolkit';

// 시간 정보를 관리하는 모듈


// type 선언
// 초기 상태 type
type timeType = {
  monthDayTime?: string;
  timeIndex?: number[];
  hours?: number;
  dayOfWeek?: string[];
}


export const initialState: timeType = {
  // 현재 월, 일, 시간
  monthDayTime: null,
  // 현재 시간으로부터 필요한 dailyTime index
  timeIndex: null,
  // 현재 시간
  hours: null,
  // 현재 요일로부터 필요한 요일 정보
  dayOfWeek: null,
}

// 현재 월, 일, 시간 정보와 필요한 dailyTime index를 가져오는 액션 생성 함수
const setTimeInfo = createAction<unknown>('time/SET_TIMEINFO');

const time = createReducer(initialState, {

  [setTimeInfo.type]: (state: timeType, action: PayloadAction<{ monthDayTime: string, timeIndex: number[], hours: number, dayOfWeek: string[] }>) => {
    state.monthDayTime = action.payload.monthDayTime;
    state.timeIndex = action.payload.timeIndex;
    state.hours = action.payload.hours;
    state.dayOfWeek = action.payload.dayOfWeek;
  }

})

// 시간 정보를 만드는 함수
const getTimeInfo = () => (dispatch, getState) => {
  // 현재 월, 일, 시간, 요일 정보를 가져오기
  const today = new Date();
  let month: number | string = today.getMonth() + 1;
  let date: number | string = today.getDate();
  let hours: number | string = today.getHours();
  const day: number = today.getDay();
  month = month < 10 ? `0${month}` : month;
  date = date < 10 ? `0${date}` : date;
  hours = hours < 10 ? `0${hours}` : hours;
  const monthDayTime = `${month} ${date} ${hours}`;
  // 필요한 dailyTime 인덱스 찾기
  const { dailyTime } = getState().weather.weatherInfo.dayInfo;
  let idx: number = dailyTime.indexOf(monthDayTime);
  // let idx: number = dailyTime.indexOf(monthDayTime);
  // 현재 시간으로부터 필요한 인덱스 배열 만들기
  const timeIndex: number[] = [];
  // 현재 요일로부터 필요한 요일 배열 만들기
  const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];
  // 현재로부터 가까운 요일
  const NEARDAY = ['오늘', '내일', '모레'];
  const dayOfWeek: string[] = [];
  for (let i = 0; i < 8; i += 1) {
    timeIndex[i] = idx;
    // 요일 배열 만들기
    // i가 0, 1, 2 이면 오늘, 내일, 모레
    if (i < 3) {
      dayOfWeek[i] = NEARDAY[i];
    }
    //  day + i 가 넘어가면 인덱스를 초과하므로 -7을하여 일요일부터 순회
    else if (day + i > 6) {
      dayOfWeek[i] = WEEKDAY[day + i - 7];
    } else {
      dayOfWeek[i] = WEEKDAY[day + i];
    }
    idx += 3;
  }
  dispatch(setTimeInfo({ monthDayTime, timeIndex, hours, dayOfWeek }));
}

export const timeActions = {
  getTimeInfo,
}

export default time;