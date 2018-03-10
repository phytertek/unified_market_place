import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import NavMenu from './navMenu/container';

const NavBar = props => (
  <AppBar position="sticky">
    <Toolbar>
      <Typography
        variant="subheading"
        color="inherit"
        onClick={() => props.push('/')}
      >
        Unified <br />
        Marketplace
      </Typography>
      <NavMenu />
    </Toolbar>
  </AppBar>
);

export default connect(null, { push })(NavBar);
