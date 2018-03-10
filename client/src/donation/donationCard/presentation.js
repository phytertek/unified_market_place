import React from 'react';
import { withStyles } from 'material-ui/styles';
import Card from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
const styles = theme => ({
  card: {
    width: 400,
    padding: 20
  },
  formControl: {
    width: '100%'
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary
  }
});

const SimpleCard = ({
  fundraiser,
  amount,
  handleRemove,
  classes,
  editAmount,
  handleEditMode,
  handleChange,
  submitEdit,
  editMode,
  inCheckout
}) => (
  <Card className={classes.card} raised={true}>
    <div>
      {editMode ? (
        <FormControl fullWidth className={classes.formControl}>
          <InputLabel htmlFor="amount">Amount</InputLabel>
          <Input
            id="amount"
            type="number"
            value={editAmount}
            name="editAmount"
            onChange={handleChange}
            style={{ fontSize: '30px' }}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>
      ) : (
        <Typography
          variant="headline"
          component="h2"
          style={{ textAlign: 'center', width: '100%S' }}
        >
          ${amount} to {fundraiser.title}
        </Typography>
      )}
    </div>
    {!inCheckout && (
      <div>
        {editMode ? (
          <Button size="small" onClick={submitEdit} style={{ width: '50%' }}>
            Update
          </Button>
        ) : (
          <Button
            size="small"
            onClick={handleEditMode}
            style={{ width: '50%' }}
          >
            Edit
          </Button>
        )}
        <Button size="small" onClick={handleRemove} style={{ width: '50%' }}>
          Remove
        </Button>
      </div>
    )}
  </Card>
);

export default withStyles(styles)(SimpleCard);
