import React from 'react';
import { connect } from 'react-redux';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import Typography from 'material-ui/Typography';

import { closeCheckoutSuccessModal } from './store';

const CheckoutSuccessModal = ({
  checkoutSuccessModalOpen,
  checkoutSuccessTotal,
  closeCheckoutSuccessModal
}) => {
  return (
    <Dialog onClose={closeCheckoutSuccessModal} open={checkoutSuccessModalOpen}>
      <Typography
        variant="display3"
        color="secondary"
        style={{ textAlign: 'center', paddingTop: 20 }}
      >
        Thanks!
      </Typography>
      <DialogTitle>Donation of ${checkoutSuccessTotal} successful!</DialogTitle>
    </Dialog>
  );
};

const mapStateToProps = state => ({ ...state.donationStore });
const mapDispatchToProps = { closeCheckoutSuccessModal };

export default connect(mapStateToProps, mapDispatchToProps)(
  CheckoutSuccessModal
);
