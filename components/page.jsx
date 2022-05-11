import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Button,
  CircularProgress,
  Grid,
  Link,
  Toolbar,
  Typography
} from "@mui/material";
import { Box } from "@mui/system";
import Head from "next/head";
import React, { useCallback } from "react";
import { useAuth } from "../utils/contexts/auth";
import { useSidebar } from "../utils/contexts/sidebarContext";

export default function Page({ children, title }) {
  const { open, setMode, setOpen, mode } = useSidebar();
  const { isLoading, isLoggedIn, user } = useAuth();

  const makeSidebar = useCallback( () => {
    if (isLoading || !isLoggedIn) {
      setMode("unauthenticated");
      return;
    }
    if(user.type === "patient") {
      setMode("patient");
    }
    if(user.type === "doctor") {
      setMode("doctor");
    }
    if(user.type === "admin") {
      setMode("admin");
    }
  },[isLoading, isLoggedIn, user, setMode]);

  if (isLoading && !isLoggedIn) {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <>
      <Head>{title}</Head>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" color="inherit" sx={{ boxShadow: "none" }}>
          <Toolbar
            variant="regular"
            style={{
              justifyContent: "space-between",
              overflow: "hidden",
            }}
          >
            <Typography variant="h6" color="secondary" noWrap>
              <Box
                sx={{
                  fontWeight: "bold",
                  color: "#1F5A1F",
                  textDecoration: "none",
                  justifyItems: "center",
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
      {children}
      
    </>
  );
}
