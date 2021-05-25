import { createReducer, createAction, PayloadAction } from '@reduxjs/toolkit';

// 슬라이더의 위치를 기록하는 모듈

// slider 타입 선언
type sliderType = {
  curIndex: number;
};

// 기본 인덱스는 0
export const initialState: sliderType = {
  curIndex: 0,
};

// 슬라이더의 인덱스를 받아오는 액션
const setSliderIndex = createAction<unknown>('slider/SET_SLIDERINDEX');

const slider = createReducer(initialState, {
  [setSliderIndex.type]: (state: sliderType, action: PayloadAction<number>) => {
    state.curIndex = action.payload;
  },
});

export const sliderActions = {
  setSliderIndex,
};

export default slider;
