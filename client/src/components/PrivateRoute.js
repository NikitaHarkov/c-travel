import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useUserContext } from '../context/userContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useUserContext();

  return (
    <Route
      {...rest}
      render={() => {
        return isAuthenticated ? Component : <Redirect to='/' />;
      }}
    />
  );
};

export default PrivateRoute;
