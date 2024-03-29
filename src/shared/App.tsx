import React from 'react';

// pages
import Detail from 'src/pages/Detail';
import LocationAdd from 'src/pages/LocationAdd';
import LocationSetting from 'src/pages/LocationSetting';
import Setting from 'src/pages/Setting';
import NotFound from 'src/pages/NotFound';
import Complain from 'src/pages/Complain';
// Router
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
// 리덕스
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../redux/configureStore';

import initialize from '../shared/kakao';

// Pages
import Main from '../pages/Main';
import PreSetting from '../pages/PreSetting';

// component
import AppLayout from '../components/AppLayout';

// 날씨 관련 모듈
import { weatherActions } from '../redux/modules/weather';

function App() {
  // 앱을 초기화할때 실행하는 함수
  const initializeApp = async () => {
    // 사용자 위치(위도, 경도) state에 기록 후 날씨 정보 불러오기
    await dispatch(weatherActions.getLocation());
    // preference 불러오기
    await dispatch(weatherActions.fetchPreference());
    // 현재 위치정보를 기반으로 날씨 정보 불러오기
    await dispatch(weatherActions.getWeatherInfo());
    // 카카오
    await initialize();
  };
  const dispatch = useDispatch();
  React.useEffect(() => {
    initializeApp();
  }, []);

  return (
    <ConnectedRouter history={history}>
      <AppLayout>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/setting" exact component={Setting} />
          <Route path="/setting/preference" exact component={PreSetting} />
          <Route path="/setting/location" exact component={LocationSetting} />
          <Route path="/setting/location/add" exact component={LocationAdd} />
          <Route path="/setting/complain" exact component={Complain} />
          <Route path="/detail/:type/:category" exact component={Detail} />
          <Route path="/detail/:type" exact component={Detail} />
          <Route component={NotFound} />
        </Switch>
      </AppLayout>
    </ConnectedRouter>
  );
}

export default App;
