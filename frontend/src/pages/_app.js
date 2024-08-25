import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import VerticalNav from '../components/VerticalNav';
import Navbar from '../components/Navbar'; // Horizontal navbar
import LoadingSpinner from '../components/LoadingSpinner';
import { CssBaseline, ThemeProvider, createTheme, Box } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0D47A1',
    },
    background: {
      default: '#121212',
    },
    text: {
      primary: '#FFFFFF',
    },
  },
});

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(true);
    };

    const handleRouteComplete = () => {
      setLoading(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    router.events.on('routeChangeComplete', handleRouteComplete);
    router.events.on('routeChangeError', handleRouteComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      router.events.off('routeChangeComplete', handleRouteComplete);
      router.events.off('routeChangeError', handleRouteComplete);
    };
  }, [router.events]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box display="flex" flexDirection="column" height="100vh">
        <Navbar />
        <Box display="flex" flex={1}>
          <VerticalNav />
          <Box
            component="main"
            flex={1}
            p={2}
            sx={{
              marginLeft: '240px', // Ensure there’s space for the vertical nav
              transition: 'margin-left 0.3s ease', // Smooth transition when opening/closing
              paddingTop: '64px'
            }}
          >
            {loading ? <LoadingSpinner /> : <Component {...pageProps} />}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default MyApp;
