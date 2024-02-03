import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import ReactDOM from 'react-dom';
import App from './App';
import Resume from './Resume';

/**
 * Customize form so each control has more space
 */
const theme = createTheme({
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          margin: '0.8em 0',
        },
      }
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
    {/* <Resume /> */}
  </ThemeProvider>,
  document.getElementById('root')
);
