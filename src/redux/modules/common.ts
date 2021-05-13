import { createReducer, createAction, PayloadAction } from '@reduxjs/toolkit';

// 시간 정보를 관리하는 모듈

// type 선언
// 초기 상태 type
type commontType = {
  isDesktopMode: boolean;
};

export const initialState: commontType = {
  isDesktopMode: false,
};

const setIsDesktopMode = createAction<unknown>('commont/SET_IS_DESKTOP_MODE');

const common = createReducer(initialState, {
  [setIsDesktopMode.type]: (state: commontType, action: PayloadAction<any>) => {
    state.isDesktopMode = action.payload;
  },
});

export const commonActions = {
  setIsDesktopMode,
};

export default common;
