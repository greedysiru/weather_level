import React from 'react';


import LocationSetting from 'src/pages/LocationSetting';
import Detail from 'src/pages/Detail';
// Router

import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
// 리덕스
import { useDispatch } from 'react-redux';
import { history } from '../redux/configureStore';

// Pages
import Main from '../pages/Main';
import Setting from '../pages/Setting';
import Mypage from '../pages/Mypage';

// import NotFound from '../pages/NotFound';
// component
import AppLayout from '../components/AppLayout';

// 날씨 관련 모듈
import { weatherActions } from '../redux/modules/weather';


function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    
    // 사용자 위치(위도, 경도) state에 기록 후 날씨 정보 불러오기
    dispatch(weatherActions.getLocation());

    // preference
    dispatch(weatherActions.fetchPreference());
    
  }, [])
  return (
    <ConnectedRouter history={history}>
      <AppLayout>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/setting/preference" exact component={Setting} />
          <Route path="/mypage" exact component={Mypage} />
          <Route path="/setting/location" exact component={LocationSetting} />
          <Route path="/detail/:type/:category" exact component={Detail} />
          {/* <Route component={NotFound} /> */}
        </Switch>
      </AppLayout>
    </ConnectedRouter>
  );
}

export default App;
