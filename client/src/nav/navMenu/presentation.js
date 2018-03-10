import React from 'react';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Menu, { MenuItem } from 'material-ui/Menu';
import Hidden from 'material-ui/Hidden';
import MenuIcon from 'material-ui-icons/Menu';
import RedeemIcon from 'material-ui-icons/Redeem';
import CheckoutDrawer from '../../donation/checkoutDrawer/container';
import CheckoutSuccessModal from '../../donation/checkoutSuccessModal';
import DonationModal from '../../donation/donationModal/container';
import FundraiserDrawer from '../../fundraiser/fundraiserDrawer/container';
import RegistrationLoginDrawer from '../../authentication/registrationLoginDrawer';

const NavMenuPresentation = props => (
  <Grid container justify="flex-end" alignItems="center">
    <Grid item>
      <IconButton onClick={props.openCheckoutDrawer} color="inherit">
        <RedeemIcon />
      </IconButton>
    </Grid>
    {props.isAuth && (
      <Hidden mdDown>
        <Grid item onClick={props.handleMenuOpen}>
          <Typography variant="title" color="inherit">
            {props.email}
          </Typography>
        </Grid>
      </Hidden>
    )}
    {props.isAuth ? (
      <Grid item>
        <IconButton
          aria-owns={props.menuOpen ? 'menu-authappbar' : null}
          aria-haspopup="true"
          onClick={props.handleMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-authappbar"
          anchorEl={props.menuAnchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={props.menuOpen}
          onClose={props.handleMenuClose}
        >
          <MenuItem onClick={() => props.openFundraiserDrawer()}>
            Start Fundraiser
          </MenuItem>
          <MenuItem
            onClick={() => {
              props.handleMenuClose();
              props.logout();
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Grid>
    ) : (
      <Grid item>
        <IconButton
          aria-owns={props.menuOpen ? 'menu-appbar' : null}
          aria-haspopup="true"
          onClick={props.handleMenuOpen}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={props.menuAnchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={props.menuOpen}
          onClose={props.handleMenuClose}
        >
          <MenuItem onClick={() => props.openRegistrationLoginDrawer(`login`)}>
            Login
          </MenuItem>
          <MenuItem
            onClick={() => props.openRegistrationLoginDrawer('register')}
          >
            Register
          </MenuItem>
        </Menu>
      </Grid>
    )}
    <DonationModal />
    <CheckoutDrawer />
    <CheckoutSuccessModal />
    <FundraiserDrawer />
    <RegistrationLoginDrawer />
  </Grid>
);

export default NavMenuPresentation;
