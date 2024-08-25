import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, ThemeProvider, createTheme } from '@mui/material';
import { getContract } from '../utils/web3'; // Adjust the path if necessary

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0D47A1', // Dark blue
    },
    background: {
      default: '#121212', // Dark background
    },
    text: {
      primary: '#FFFFFF', // White text
    },
  },
});
const Navbar = () => {
  const [account, setAccount] = useState(null);
  
  const accountChangeHandler = (newAccount) => {
    setAccount(newAccount); // Update the state with the new account
  };

  const connectToMetaMask = async () => {
    if (window.ethereum) {
        // res[0] for fetching a first wallet
        window.ethereum
            .request({ method: "eth_requestAccounts" })
            .then((res) =>
                accountChangeHandler(res[0])
            );
        } else {
            alert("install metamask extension!!");
        }
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, margin:'20px'}}>
            Student Crowdfunding
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: 'white',
              color: '#0D47A1',
              borderRadius: '25px',
              fontWeight: 'bold',
              textTransform: 'none',
              padding: '8px 16px',
              '&:hover': {
                backgroundColor: '#0D47A1',
                color: 'white',
              },
            }}
            onClick={connectToMetaMask}
          >
            {account ? `Connected: ${account}` : 'Connect'}
          </Button>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
