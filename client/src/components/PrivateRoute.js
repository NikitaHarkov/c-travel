import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useUserContext } from '../context/userContext';

const PrivateRoute = ({ children, ...rest }) => {
  const { isAuthenticated } = useUserContext();
  return (
    <Route
      {...rest}
      render={() => {
        return isAuthenticated ? children : <Redirect to='/' />;
      }}
    />
  );
};

export default PrivateRoute;
