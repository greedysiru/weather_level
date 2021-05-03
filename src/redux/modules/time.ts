import { createReducer, createAction, PayloadAction } from '@reduxjs/toolkit';

// 시간 정보를 관리하는 모듈


// type 선언
// 초기 상태 type
type weatherType = {
  monthDayTime?: string;
  timeIndex?: number[];
  hours?: number;
}


export const initialState: weatherType = {
  // 현재 월, 일, 시간
  monthDayTime: null,
  // 현재 시간으로부터 필요한 dailyTime index
  timeIndex: null,
  // 현재 시간
  hours: null,
}

// 현재 월, 일, 시간 정보와 필요한 dailyTime index를 가져오는 액션 생성 함수
const setMonthDayTime = createAction<unknown>('time/SETMONTHDAYTIME');

const time = createReducer(initialState, {

  [setMonthDayTime.type]: (state: weatherType, action: PayloadAction<{ monthDayTime: string, timeIndex: number[], hours: number }>) => {
    state.monthDayTime = action.payload.monthDayTime;
    state.timeIndex = action.payload.timeIndex;
    state.hours = action.payload.hours;
  }

})

// // 현재 월, 일, 시간 정보를 가져오고 필요한 dailyTime 인덱스를 찾는 함수
const getMonthDayTime = () => (dispatch, getState) => {
  // 현재 월, 일, 시간 정보를 가져오기
  const today = new Date();
  let month: number | string = today.getMonth() + 1;
  let date: number | string = today.getDate();
  let hours: number | string = today.getHours();
  month = month < 10 ? `0${month}` : month;
  date = date < 10 ? `0${date}` : date;
  hours = hours < 10 ? `0${hours}` : hours;
  const monthDayTime = `${month} ${date} ${hours}`;
  // 필요한 dailyTime 인덱스 찾기
  const { dailyTime } = getState().weather.weatherInfo.dayInfo;
  let idx: number = dailyTime.indexOf(monthDayTime);
  // 현재 시간으로부터 필요한 인덱스 배열 만들기
  const timeIndex: number[] = [];
  for (let i = 0; i < 8; i += 1) {
    timeIndex[i] = idx
    idx += 3
  }
  dispatch(setMonthDayTime({ monthDayTime, timeIndex, hours }));
}

export const timeActions = {
  getMonthDayTime,
}

export default time;