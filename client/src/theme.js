import { createMuiTheme } from 'material-ui/styles';
// import blue from 'material-ui/colors/blue ';
import red from 'material-ui/colors/red';
// import green from 'material-ui/colors/green';
const theme = {
  palette: {
    primary: {
      light: '#5472d3',
      main: '#0d47a1',
      dark: '#002171',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#c3fdff',
      main: '#90caf9',
      dark: '#5d99c6',
      contrastText: '#000000'
    },
    error: red,
    type: 'dark' // Switch between dark and light mode
  }
};

export default createMuiTheme(theme);
