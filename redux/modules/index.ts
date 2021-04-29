import { combineReducers } from 'redux';

// modules
import weather from './weather';

// root reducer
const rootReducer = combineReducers({
  weather: weather
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;