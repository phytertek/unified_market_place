import React from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';

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
  changeHandler,
  submitHandler,
  title,
  __titleError,
  description,
  __descriptionError,
  goal,
  __goalError
}) => {
  return (
    <div className={classes.root}>
      <form className={classes.form} onSubmit={submitHandler}>
        <Grid container direction="column">
          <Grid item>
            <TextField
              name="title"
              value={title}
              label="Title"
              error={!!__titleError}
              helperText={__titleError}
              onChange={changeHandler}
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
              onChange={changeHandler}
              fullWidth
              multiline
            />
          </Grid>
          <Grid item>
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel htmlFor="goal">Goal</InputLabel>
              <Input
                id="goal"
                type="number"
                value={goal}
                name="goal"
                onChange={changeHandler}
                startAdornment={
                  goal && <InputAdornment position="start">$</InputAdornment>
                }
              />
            </FormControl>
          </Grid>
        </Grid>
      </form>
      <Button
        style={{ width: '100%', padding: 20 }}
        variant="raised"
        color="primary"
        onClick={submitHandler}
      >
        <Typography variant="title">Create Fundraiser</Typography>
      </Button>
    </div>
  );
};

export default withStyles(style)(FundraiserFormPresentation);
