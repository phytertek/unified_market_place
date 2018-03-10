import React from 'react';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import DonationCard from '../donationCard/container';
import DonorForm from '../donorForm/container';

const CheckoutDrawerPresentation = props => {
  const {
    checkoutDrawerOpen,
    closeCheckoutDrawer,
    pendingDonations,
    handleRemove,
    handleChange,
    handleStartCheckout,
    inCheckout,
    isCustomer
  } = props;
  return (
    <Drawer
      anchor="right"
      open={checkoutDrawerOpen}
      onClose={closeCheckoutDrawer}
      style={{ width: 400 }}
    >
      {!inCheckout && !!pendingDonations.length ? (
        <Button
          style={{ width: '100%', padding: 20 }}
          variant="raised"
          color="primary"
          onClick={handleStartCheckout}
        >
          <Typography variant="title">
            {`Donate $${pendingDonations.reduce(
              (t, d) => t + Number(d.amount),
              0
            )}`}
          </Typography>
        </Button>
      ) : null}

      {inCheckout && !isCustomer && pendingDonations.length && <DonorForm />}

      {!!pendingDonations.length &&
        pendingDonations.map((donation, index) => (
          <DonationCard
            inCheckout={inCheckout}
            {...donation}
            handleRemove={() => {
              handleRemove(index);
            }}
            handleEdit={amount => {
              handleChange({ index, amount });
            }}
            key={donation.fundraiser.title + donation.fundraiser._id + index}
          />
        ))}

      {!!!pendingDonations.length && (
        <div style={{ width: 400 }}>
          <Typography
            variant="headline"
            color="secondary"
            style={{ padding: 20 }}
          >
            No donations yet...
          </Typography>
          <Typography
            variant="title"
            color="secondary"
            gutterBottom={true}
            style={{ padding: 20 }}
          >
            Get out there and find your worthy cause!
          </Typography>
          <Button
            style={{ width: '100%', padding: 20 }}
            variant="raised"
            color="primary"
            onClick={closeCheckoutDrawer}
          >
            <Typography variant="title">Close</Typography>
          </Button>
        </div>
      )}
    </Drawer>
  );
};

export default CheckoutDrawerPresentation;
