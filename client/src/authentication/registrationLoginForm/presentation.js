import React from 'react';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { LinearProgress } from 'material-ui/Progress';
import IconButton from 'material-ui/IconButton';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';

const RegLoginFormPresentation = ({
  openRegistrationLoginDrawer,
  visiblePasswordHandler,
  changeHandler,
  submitHandler,
  email,
  password,
  type,
  authenticating,
  __emailError,
  __passwordError,
  __showPassword
}) => {
  return (
    <div style={{ width: 400 }}>
      <div style={{ padding: 20 }}>
        <Grid container direction="column">
          <Grid item>
            <TextField
              type="email"
              value={email}
              error={!!__emailError}
              helperText={__emailError}
              onChange={changeHandler}
              name="email"
              label="Email"
              fullWidth
            />
          </Grid>
          <Grid item>
            <FormControl style={{ width: '100%' }}>
              <InputLabel htmlFor="password" error={!!__passwordError}>
                Password
              </InputLabel>
              <Input
                name="password"
                id="password"
                type={__showPassword ? 'text' : 'password'}
                value={password}
                error={!!__passwordError}
                onChange={changeHandler}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={visiblePasswordHandler}
                      color={!!__passwordError ? 'primary' : 'secondary'}
                    >
                      {__showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                fullWidth
              />

              {__passwordError && (
                <FormHelperText error>{__passwordError}</FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
      </div>
      {authenticating ? (
        <LinearProgress />
      ) : (
        <div>
          <Button
            style={{ width: '100%', padding: 20 }}
            variant="raised"
            color="primary"
            onClick={submitHandler}
          >
            <Typography variant="title">{type}</Typography>
          </Button>
          <Button
            variant="raised"
            color="secondary"
            style={{ width: '100%' }}
            onClick={() => {
              openRegistrationLoginDrawer(
                type === 'login' ? 'register' : 'login'
              );
            }}
          >
            {type === 'login' ? 'Register' : 'Login'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default RegLoginFormPresentation;
