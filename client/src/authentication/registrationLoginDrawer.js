import React from 'react';
import { connect } from 'react-redux';
import Drawer from 'material-ui/Drawer';
import { login, register } from './async';
import {
  closeRegistrationLoginDrawer,
  openRegistrationLoginDrawer
} from './store';
import RegistrationLoginForm from './registrationLoginForm/container';
const RegistrationLoginDrawer = ({
  registrationLoginDrawerOpen,
  registrationLoginType,
  closeRegistrationLoginDrawer,
  openRegistrationLoginDrawer,
  register,
  login,
  authenticating
}) => {
  return (
    <Drawer
      anchor="right"
      open={registrationLoginDrawerOpen}
      onClose={closeRegistrationLoginDrawer}
      style={{ width: 240 }}
    >
      <RegistrationLoginForm
        type={registrationLoginType || 'login'}
        submit={registrationLoginType === 'register' ? register : login}
        authenticating={authenticating}
        openRegistrationLoginDrawer={openRegistrationLoginDrawer}
        closeRegistrationLoginDrawer={closeRegistrationLoginDrawer}
      />
    </Drawer>
  );
};
const mapStateToProps = (state, ownProps) => ({
  registrationLoginDrawerOpen: state.authStore.registrationLoginDrawerOpen,
  registrationLoginType: state.authStore.registrationLoginType,
  authenticating: state.authStore.authenticating
});
const mapDispatchToProps = {
  closeRegistrationLoginDrawer,
  openRegistrationLoginDrawer,
  register,
  login
};

export default connect(mapStateToProps, mapDispatchToProps)(
  RegistrationLoginDrawer
);
