import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { logout } from '../../authentication/async';
import {
  authFromStorage,
  openRegistrationLoginDrawer
} from '../../authentication/store';
import { openCheckoutDrawer } from '../../donation/store';
import { openFundraiserDrawer } from '../../fundraiser/store';
import { openFundraiserDrawerRedirect } from '../../fundraiser/async';
import NavMenuPresentation from './presentation';

class NavMenu extends Component {
  componentDidMount() {
    const stripeRedirect = JSON.parse(
      localStorage.getItem('awaitingStripeRedirect')
    );
    if (stripeRedirect) {
      localStorage.removeItem('awaitingStripeRedirect');
      this.props.openFundraiserDrawerRedirect();
      this.props.push('/');
    }
    const localStore = JSON.parse(localStorage.getItem('auth'));
    if (!!localStore && localStore.isAuth && !!localStore.token) {
      this.props.authFromStorage(localStore);
    }
  }
  componentWillReceiveProps(nextProps) {
    let updated = false;
    const updatedLocal = [
      'isAuth',
      'email',
      'token',
      'isFundraiser',
      'isDonor'
    ].reduce((localStore, property) => {
      if (this.props[property] !== nextProps[property]) {
        updated = true;
        localStore[property] = nextProps[property];
      } else {
        localStore[property] = this.props[property];
      }
      return localStore;
    }, {});
    if (updated) {
      localStorage.setItem('auth', JSON.stringify(updatedLocal));
    }
  }
  state = { menuAnchorEl: null };
  handleMenuOpen = e => {
    const targetEl = e.currentTarget;
    this.setState(() => ({
      menuAnchorEl: targetEl
    }));
  };
  handleMenuClose = () => {
    this.setState(() => ({
      menuAnchorEl: null
    }));
  };
  openRegistrationLoginDrawer = location => {
    this.handleMenuClose();
    this.props.openRegistrationLoginDrawer(location);
  };
  openFundraiserDrawer = () => {
    this.handleMenuClose();
    this.props.openFundraiserDrawer();
  };
  navTo = location => {
    this.handleMenuClose();
    this.props.push(location);
  };
  render() {
    const menuOpen = !!this.state.menuAnchorEl;
    return (
      <NavMenuPresentation
        {...this.props}
        openRegistrationLoginDrawer={this.openRegistrationLoginDrawer}
        openFundraiserDrawer={this.openFundraiserDrawer}
        menuAnchorEl={this.state.menuAnchorEl}
        menuOpen={menuOpen}
        handleMenuOpen={this.handleMenuOpen}
        handleMenuClose={this.handleMenuClose}
        navTo={this.navTo}
      />
    );
  }
}
const mapStateToProps = state => ({ ...state.authStore });
const mapDispatchToProps = {
  push,
  logout,
  openCheckoutDrawer,
  openRegistrationLoginDrawer,
  openFundraiserDrawer,
  openFundraiserDrawerRedirect,
  authFromStorage
};

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);
