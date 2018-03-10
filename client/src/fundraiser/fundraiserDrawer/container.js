import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import FundraiserDrawerPresentation from './presentation';
import { closeFundraiserDrawer } from '../store';

class FundraiserDrawer extends Component {
  render() {
    return <FundraiserDrawerPresentation {...this.props} />;
  }
}

const mapStateToProps = state => ({
  ...state.fundraiserStore,
  ...state.authStore
});

const mapDispatchToProps = {
  closeFundraiserDrawer,
  push
};

export default connect(mapStateToProps, mapDispatchToProps)(FundraiserDrawer);
