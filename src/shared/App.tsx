import React from 'react';

import Detail from 'src/pages/Detail';
import LocationAdd from 'src/pages/LocationAdd';
import LocationSetting from 'src/pages/LocationSetting';
import Setting from 'src/pages/Setting';
// Router

import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
// 리덕스
import { useDispatch } from 'react-redux';
import { history } from '../redux/configureStore';

// Pages
import Main from '../pages/Main';
import PreSetting from '../pages/PreSetting';

// import NotFound from '../pages/NotFound';
// component
import AppLayout from '../components/AppLayout';
import Logo from '../components/Logo';

// 날씨 관련 모듈
import { weatherActions } from '../redux/modules/weather';

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    // 사용자 위치(위도, 경도) state에 기록 후 날씨 정보 불러오기
    dispatch(weatherActions.getLocation());

    // preference
    dispatch(weatherActions.fetchPreference());
  }, []);
  return (
    <ConnectedRouter history={history}>
      <AppLayout>
        <Switch>
          <Route path="/" exact component={Logo} />
          <Route path="/main" exact component={Main} />
          <Route path="/setting" exact component={Setting} />
          <Route path="/setting/preference" exact component={PreSetting} />
          <Route path="/setting/location" exact component={LocationSetting} />
          <Route path="/setting/location/add" exact component={LocationAdd} />
          <Route path="/detail/:type/:category" exact component={Detail} />
          {/* <Route component={NotFound} /> */}
        </Switch>
      </AppLayout>
    </ConnectedRouter>
  );
}

export default App;
