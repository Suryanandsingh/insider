import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import store from './Redux/Store';
import LandingPage from './Component/landing';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path={"/"} component={LandingPage} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
