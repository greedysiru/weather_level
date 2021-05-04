import React from 'react';

// Redux
import LocationSetting from 'src/pages/LocationSetting';
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
          <Route path="/setting" exact component={Setting} />
          <Route path="/mypage" exact component={Mypage} />
          <Route path="/locationSetting" exact component={LocationSetting} />
          {/* <Route component={NotFound} /> */}
        </Switch>
      </AppLayout>
    </ConnectedRouter>
  );
}

export default App;
