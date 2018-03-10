import React from 'react';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import { CLIENT } from '../../host.json';

import FundraiserForm from '../fundraiserForm/container';

const FundraiserDrawerPresentation = ({
  fundraiserDrawerOpen,
  closeFundraiserDrawer,
  push,
  isAuth,
  token,
  isFundraiser
}) => {
  return (
    <Drawer
      anchor="right"
      open={fundraiserDrawerOpen}
      onClose={closeFundraiserDrawer}
      style={{ width: 400 }}
    >
      {!isFundraiser && (
        <Button
          color="primary"
          variant="raised"
          style={{ width: '100%', padding: 20 }}
          onClick={() => {
            localStorage.setItem('awaitingStripeRedirect', 'true');
            window.location.replace(
              `https://connect.stripe.com/express/oauth/authorize?redirect_uri=${CLIENT}&client_id=ca_CIbzQTufBs2nGYYVgQacU6IWpjaGvsRu&state=${token}`
            );
          }}
        >
          <Typography variant="title">Create Fundraiser Account</Typography>
        </Button>
      )}
      {isFundraiser && <FundraiserForm />}
    </Drawer>
  );
};

export default FundraiserDrawerPresentation;
