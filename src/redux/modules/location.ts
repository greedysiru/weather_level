import { createReducer, createAction, PayloadAction } from '@reduxjs/toolkit';
import { locationAPI } from 'src/shared/api';

// 시간 정보를 관리하는 모듈

// type 선언
// 초기 상태 type
type region = {
  bigRegionName: string;
  smallRegionList: smallRegion[];
};
type smallRegion = {
  latitude: string;
  longitude: string;
  smallRegionName: string;
};
type locationType = {
  userLocationInfo: {
    currentRegion: string;
    saveRegions: string[];
  };
  allRegion: region[];
};

export const initialState: locationType = {
  userLocationInfo: null, // 사용자 위치정보
  allRegion: [], // 전체 지역 목록
};

const setUserLocationInfo = createAction<unknown>('location/SET_USER_LOCATION_INFO');
const setAllRegion = createAction<unknown>('location/SET_ALL_REGION');

const location = createReducer(initialState, {
  [setUserLocationInfo.type]: (state: locationType, action: PayloadAction<any>) => {
    state.userLocationInfo = action.payload;
  },
  [setAllRegion.type]: (state: locationType, action: PayloadAction<any>) => {
    state.allRegion = action.payload;
  },
});

// 전체 지역정보
const fetchAllResions = () => async (dispatch, getState, { history }) => {
  try {
    const res = await locationAPI.fetchAllRegions();
    dispatch(setAllRegion(res.data));
  } catch (error) {
    // 에러페이지로 이동??
    console.error(error);
  }
};

const fetchUserRegion = () => async (dispatch, getState, { history }) => {
  try {
    const res = await locationAPI.getUserRegion();
    dispatch(setUserLocationInfo(res.data));
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
    console.log(data);
    const res = await locationAPI.createUserRegion(data);
    alert('선택한 지역을 추가했습니다');
    history.push('/setting/location');
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

export default location;
