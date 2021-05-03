import React from 'react';

// Redux

// Router
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configureStore';

// Pages
import Main from '../pages/Main';
// import NotFound from '../pages/NotFound';
import Setting from '../pages/Setting';
import Mypage from '../pages/Mypage';

// component
import AppLayout from '../components/AppLayout';


function App() {
  return (
    <ConnectedRouter history={history}>
      <AppLayout>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/Setting" exact component={Setting} />
          <Route path="/Mypage" exact component={Mypage} />
          {/* <Route component={NotFound} /> */}
        </Switch>
      </AppLayout>
    </ConnectedRouter>
  );
}

export default App;
