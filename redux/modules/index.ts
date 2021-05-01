import { combineReducers } from 'redux';

// modules
import weather from './weather';
import time from './time';

// root reducer
const rootReducer = combineReducers({
  weather: weather,
  time: time
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;