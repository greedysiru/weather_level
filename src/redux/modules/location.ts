import { createReducer, createAction, PayloadAction } from '@reduxjs/toolkit';
import { locationAPI } from 'src/shared/api';
import { setHeaderToken } from 'src/shared/common';
import { commonActions } from './common';

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
type oftenSeenRegions = {
  bigRegionName: string;
  smallRegionName: string;
};
type locationType = {
  userLocationInfo: {
    currentRegion: {
      bigRegionName: string;
      smallRegionName: string;
    };
    latestRequestRegion: {
      bigRegionName: string;
      smallRegionName: string;
    };
    oftenSeenRegions: oftenSeenRegions[];
  };
  allRegion: region[];
  loading: boolean;
};

export const initialState: locationType = {
  userLocationInfo: null, // 사용자 위치정보
  allRegion: [], // 전체 지역 목록
  loading: false,
};

const setUserLocationInfo = createAction<unknown>('location/SET_USER_LOCATION_INFO');
const setAllRegion = createAction<unknown>('location/SET_ALL_REGION');
const setLoading = createAction<unknown>('location/SET_LOADING');

const location = createReducer(initialState, {
  [setUserLocationInfo.type]: (state: locationType, action: PayloadAction<any>) => {
    state.userLocationInfo = action.payload;
  },
  [setAllRegion.type]: (state: locationType, action: PayloadAction<any>) => {
    state.allRegion = action.payload;
  },
  [setLoading.type]: (state: locationType, action: PayloadAction<any>) => {
    state.loading = action.payload;
  },
});

// 전체 지역정보
const fetchAllResions = () => async (dispatch, getState, { history }) => {
  try {
    dispatch(commonActions.setLoading(true));
    const res = await locationAPI.fetchAllRegions();

    dispatch(commonActions.setLoading(false));
    dispatch(setAllRegion(res.data));
  } catch (error) {
    // 에러페이지로 이동??
    console.error(error);
    dispatch(commonActions.setLoading(false));
  }
};

const fetchUserRegion = () => async (dispatch, getState, { history }) => {
  try {
    dispatch(commonActions.setLoading(true));
    const res = await locationAPI.getUserRegion();
    setHeaderToken(res.headers.identification);

    dispatch(setUserLocationInfo(res.data));
    dispatch(commonActions.setLoading(false));
  } catch (error) {
    // 에러페이지로 이동??
    console.error(error);
    dispatch(commonActions.setLoading(false));
  }
};

export type regionType = {
  region: string;
};
const fetchUpdateUserRegion = (data) => async (dispatch, getState, { history }) => {
  try {
    dispatch(commonActions.setLoading(true));
    const res = await locationAPI.updateUserRegion(data);
    setHeaderToken(res.headers.identification);
    dispatch(commonActions.setMsg('선택한 위치를 삭제했습니다'));
    dispatch(commonActions.setLoading(false));
  } catch (error) {
    // 에러페이지로 이동??
    console.error(error);
    dispatch(commonActions.setMsg('삭제에 실패했습니다'));
    dispatch(commonActions.setLoading(false));
  }
};

export const locationActions = {
  fetchAllResions,
  fetchUserRegion,
  fetchUpdateUserRegion,
};

export default location;
