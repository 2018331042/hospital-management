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

export default function Page({ children, title }) {
  const { setMode, setOpen } = useSidebar();
  const { isLoading, isLoggedIn, user } = useAuth();

  const makeSidebar = useCallback(() => {
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
        <AppBar position="static" color="inherit" sx={{ boxShadow: 'none' }}>
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
                <Link href="/">Hospital Management</Link>
              </Box>
            </Typography>
            <div>{makeSidebar()}</div>
          </Toolbar>
        </AppBar>
      </Box>
      <div
        style={{
          display: 'flex',
          flexGrow: 1,
          direction: 'column',
          alignItems: 'center',
          minHeight: '80vh',
        }}
      >
        <Container maxWidth="xl" md={4} xs={6} fixed={true}>
          {children}
        </Container>
      </div>
    </div>
  );
}
