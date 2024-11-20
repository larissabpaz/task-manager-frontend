import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#CB50DE',
    },
    secondary: {
      main: '#f0ec1c',
    },
    background: {
      default: '#f4f4f4',
      paper: '#ffffff',
    },
    text: {
      primary: '#444444',
      secondary: '#787878',
    },
  },
});

export default theme;
