import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Dialog, {
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog
} from 'material-ui/Dialog';

const styles = theme => ({
  root: {
    width: 400
  },
  formControl: {
    fontSize: '50px'
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3
  }
});

const CreateDonationModalPresentation = ({
  amount,
  handleChange,
  handleClose,
  handleSubmit,
  donationModalOpen,
  selectedFundraiser,
  classes,
  fullScreen
}) => {
  return (
    <Dialog
      fullScreen={fullScreen}
      open={donationModalOpen}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        {selectedFundraiser
          ? `${selectedFundraiser.title} appreciates`
          : 'We appreciate'}{' '}
        your donation!
      </DialogTitle>
      <DialogContent>
        <DialogContentText />
        <FormControl fullWidth className={classes.formControl}>
          <InputLabel htmlFor="amount">Amount</InputLabel>
          <Input
            id="adornment-amount"
            type="number"
            value={amount}
            name="amount"
            onChange={handleChange}
            style={{
              fontSize: '50px'
            }}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>
      </DialogContent>
      <Button
        onClick={handleSubmit}
        style={{ width: '100%', padding: 20 }}
        variant="raised"
        color="primary"
      >
        <Typography variant="title">Donate</Typography>
      </Button>
      <Button
        onClick={handleClose}
        style={{ width: '100%' }}
        variant="raised"
        color="secondary"
      >
        Cancel
      </Button>
    </Dialog>
  );
};

export default withStyles(styles)(
  withMobileDialog()(CreateDonationModalPresentation)
);
