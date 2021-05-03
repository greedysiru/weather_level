import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';

import thunk from 'redux-thunk';

import rootReducer from './modules';


export const history = createBrowserHistory();



// 미들웨어 적용
// history  넣기
const middlewares = [thunk.withExtraArgument({ history })];

// 지금의 환경
const env = process.env.NODE_ENV;

// Chrome Extension
// window 타입 선언
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
// Redux devTools 설정
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// 미들웨어 묶기
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

// type RootState = ReturnType<typeof rootReducer>;

// 미들웨어와 리듀서를 엮어 store 생성
// const store = (initialStore) => createStore(rootReducer, enhancer);
const store = createStore(rootReducer, enhancer);


export default store;