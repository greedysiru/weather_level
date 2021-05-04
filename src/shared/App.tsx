import React from 'react';


import LocationSetting from 'src/pages/LocationSetting';
import Detail from 'src/pages/Detail';
// Router

import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configureStore';

// Pages
import Main from '../pages/Main';
import Setting from '../pages/Setting';
import Mypage from '../pages/Mypage';

// import NotFound from '../pages/NotFound';
// component
import AppLayout from '../components/AppLayout';





function App() {
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
