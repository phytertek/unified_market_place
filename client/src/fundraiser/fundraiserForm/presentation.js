import React from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import AmountField from '../../common/amountField';

const style = theme => ({
  root: {
    width: 400
  },
  form: { padding: 20 },
  formControl: {
    fontSize: '50px'
  }
});
const FundraiserFormPresentation = ({
  classes,
  handleChange,
  handleSubmit,
  handleGoalChange,
  title,
  __titleError,
  description,
  __descriptionError,
  goal,
  __goalError,
  __focused
}) => {
  return (
    <div className={classes.root}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Grid container direction="column">
          <Grid item>
            <TextField
              name="title"
              value={title}
              label="Title"
              error={!!__titleError}
              helperText={__titleError}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              name="description"
              value={description}
              label="Description"
              error={!!__descriptionError}
              helperText={__descriptionError}
              onChange={handleChange}
              fullWidth
              multiline
            />
          </Grid>
          <Grid item>
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel htmlFor="goal">Goal</InputLabel>
              <Input
                id="goal"
                value={goal}
                name="goal"
                onChange={handleGoalChange}
                inputComponent={AmountField}
              />
            </FormControl>
          </Grid>
        </Grid>
      </form>
      <Button
        style={{ width: '100%', padding: 20 }}
        variant="raised"
        color="primary"
        onClick={handleSubmit}
      >
        <Typography variant="title">Create Fundraiser</Typography>
      </Button>
    </div>
  );
};

export default withStyles(style)(FundraiserFormPresentation);
