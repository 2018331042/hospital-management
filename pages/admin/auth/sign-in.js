import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import router from "next/router";
import { useState } from "react";
import Page from "../../../components/page";
import { useAuth } from "../../../utils/contexts/auth";
import useTilg from 'tilg';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();
  useTilg();
  const submitHandler = async () => {
    console.log({ email, password });

    const response = await signIn(email, password, "admin");
    console.log({ response });
    if (response.status === "SUCCESS") router.push("/");
  };
  return (
    <Page>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "50vh", marginTop: "10vh" }}
      >
        <Paper elevation={3} sx={{ margin: 2 }}>
          <Typography
            variant="h5"
            component="h1"
            sx={{ color: "Grey", fontWeight: "bold" }}
            display="flex"
            justifyContent="center"
            marginTop="5vh"
          >
            Admin Sign-in
          </Typography>
          <Box sx={{ padding: 1, margin: 3 }}>
            <Grid item md={12} lg={12}>
              <TextField
                id="email"
                label="Email"
                type="Email"
                autoComplete="Email"
                variant="outlined"
                margin="normal"
                sx={{ width: "300px" }}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                id="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                margin="normal"
                sx={{ width: "300px" }}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Box>
        </Paper>
        <Button variant="contained" color="secondary" onClick={submitHandler}>
          Submit
        </Button>
      </Grid>
    </Page>
  );
};
export default SignIn;
