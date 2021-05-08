import { createReducer, createAction, PayloadAction } from '@reduxjs/toolkit';
import { locationAPI } from 'src/shared/api';

// 시간 정보를 관리하는 모듈

// type 선언
// 초기 상태 type
type locationType = {
  location: any;
};

export const initialState: locationType = {
  location: null,
};

// 현재 월, 일, 시간 정보와 필요한 dailyTime index를 가져오는 액션 생성 함수
const setTimeInfo = createAction<unknown>('time/SET_TIMEINFO');

const time = createReducer(initialState, {
  [setTimeInfo.type]: (
    state: locationType,
    action: PayloadAction<{ monthDayTime: string; timeIndex: number[]; hours: number; dayOfWeek: string[] }>,
  ) => {
    state.location = action.payload.monthDayTime;
  },
});

// 시간 정보를 만드는 함수
const fetchAllResions = () => async (dispatch, getState, { history }) => {
  try {
    const res = await locationAPI.fetchAllRegions();

    console.log('fetch all region', res);
  } catch (error) {
    // 에러페이지로 이동??
    console.error(error);
  }
};

const fetchUserRegion = () => async (dispatch, getState, { history }) => {
  try {
    const res = await locationAPI.getUserRegion();

    console.log('fetch user region', res);
  } catch (error) {
    // 에러페이지로 이동??
    console.error(error);
  }
};

export type regionType = {
  region: string;
};
const fetchCreateUserRegion = (data) => async (dispatch, getState, { history }) => {
  try {
    const res = await locationAPI.createUserRegion(data);

    console.log('fetch user region', res);
  } catch (error) {
    // 에러페이지로 이동??
    console.error(error);
  }
};

const fetchUpdateUserRegion = (data) => async (dispatch, getState, { history }) => {
  try {
    const res = await locationAPI.updateUserRegion(data);

    console.log('fetch user region', res);
  } catch (error) {
    // 에러페이지로 이동??
    console.error(error);
  }
};

export const locationActions = {
  fetchAllResions,
  fetchUserRegion,
  fetchCreateUserRegion,
  fetchUpdateUserRegion,
};

export default time;
