import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { validate } from '../async';
const PrivateRoute = ({ validate, isAuth, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      validate();
      return isAuth ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location }
          }}
        />
      );
    }}
  />
);

const mapStateToProps = state => ({
  isAuth: state.authStore.isAuth
});

export default connect(mapStateToProps, { validate })(PrivateRoute);
