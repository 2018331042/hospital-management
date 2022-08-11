import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  Grid,
  Link,
  Toolbar,
  Typography,
} from '@mui/material';
import { Box, padding } from '@mui/system';
import Head from 'next/head';
import React, { useCallback } from 'react';
import { useAuth } from '../utils/contexts/auth';
import { useSidebar } from '../utils/contexts/sidebarContext';
import useTilg from 'tilg';
export default function Page({ children, title }) {
  const { setMode, setOpen } = useSidebar();
  const { isLoading, isLoggedIn, user } = useAuth();
  useTilg();
  const makeSidebar = useCallback(() => {
    console.log({ user });
    if (isLoading || !isLoggedIn) {
      setMode('unauthenticated');
      return;
    }
    if (user.type === 'patient') {
      setMode('patient');
    }
    if (user.type === 'doctor') {
      setMode('doctor');
    }
    if (user.type === 'admin') {
      setMode('admin');
    }
  }, [isLoading, isLoggedIn, user, setMode]);

  if (isLoading && !isLoggedIn) {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <div>
      <Head>{title}</Head>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          color="inherit"
          sx={{ boxShadow: 'none', minHeight: '10vh' }}
        >
          <Toolbar
            variant="regular"
            style={{
              justifyContent: 'space-between',
              overflow: 'hidden',
            }}
          >
            <Typography variant="h6" color="secondary" noWrap>
              <Box
                sx={{
                  fontWeight: 'bold',
                  color: '#1F5A1F',
                  textDecoration: 'none',
                  justifyItems: 'center',
                }}
              >
                <Button
                  sx={{ margin: 0, padding: 0 }}
                  onClick={() => setOpen(true)}
                >
                  <MenuIcon />
                </Button>
                <Link href="/" sx={{ textDecoration: 'none' }}>
                  Hospital Management
                </Link>
              </Box>
            </Typography>
            <div>{makeSidebar()}</div>
          </Toolbar>
        </AppBar>
      </Box>
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          marginTop: '5rem',
        }}
      >
        <Container
          sx={{
            flexDirection: 'column',
            minHeight: '80v',
            paddingTop: '55px',
            alignItems: 'center',
          }}
        >
          {children}
        </Container>

        <div>
          <footer
            style={{
              position: 'sticky',
              left: 0,
              bottom: 0,
              width: '100%',
              height: '100%',
              textAlign: 'center',
              fontWeight: 'bold',
              fontFamily: `"Lucida Console", "Courier New", monospace`,
              marginTop: '5rem',
              marginBottom: '10rem',
            }}
          >
            @ Powered By NextJs And Mysql
          </footer>
        </div>
      </div>
    </div>
  );
}
