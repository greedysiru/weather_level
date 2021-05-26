import { createReducer, createAction, PayloadAction } from '@reduxjs/toolkit';
import { complainAPI } from 'src/shared/api';

// 반응형 디자인, 불편사항 접수를 관리하는 모듈

// type 선언
// 초기 상태 type
type commontType = {
  isDesktopMode: boolean;
  loading: boolean;
  msg: string;
};

export const initialState: commontType = {
  isDesktopMode: false,
  loading: false,
  msg: '',
};

const setIsDesktopMode = createAction<unknown>('commont/SET_IS_DESKTOP_MODE');
const setLoading = createAction<unknown>('commont/SET_LOADING');
const setMsg = createAction<unknown>('commont/SET_MSG');

const common = createReducer(initialState, {
  [setIsDesktopMode.type]: (state: commontType, action: PayloadAction<any>) => {
    state.isDesktopMode = action.payload;
  },
  [setLoading.type]: (state: commontType, action: PayloadAction<any>) => {
    state.loading = action.payload;
  },
  [setMsg.type]: (state: commontType, action: PayloadAction<any>) => {
    state.msg = action.payload;
  },
});

const fetchPostComplain = (data) => async (dispatch, getState, { history }) => {
  try {
    dispatch(setLoading(true));
    const res = await complainAPI.createComplain(data);

    dispatch(setMsg('소중한 의견 감사합니다'));
    dispatch(setLoading(false));
  } catch (error) {
    // 에러페이지로 이동??
    console.error(error);
    dispatch(setMsg('전송에 실패했습니다'));
    dispatch(setLoading(false));
  }
};

export const commonActions = {
  setIsDesktopMode,
  fetchPostComplain,
  setLoading,
  setMsg,
};

export default common;
