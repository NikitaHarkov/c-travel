import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useUserContext } from './context/userContext';
import { Login, Contracts, Error } from './pages';
import { PrivateRoute } from './components';

const App = () => {
  const { loadUser } = useUserContext();
  useEffect(() => {
    loadUser();
    //eslint-disable-next-line
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Login} />
        <PrivateRoute exact path='/contracts' children={<Contracts />} />
        <Route component={Error} />
      </Switch>
    </Router>
  );
};

export default App;
