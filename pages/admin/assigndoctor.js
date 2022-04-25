import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Appbar from "../../components/NavBar";

export default function AssignDoctor() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log("here");
  const submitHandler = () => {
    console.log({ email, password });
  };
  return (
    <div>
      <Appbar />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "50vh", marginTop: "10vh" }}       
      >
        <Typography variant="h5" component="h1" sx={{ color: "Grey", fontWeight: 'bold' }}>
          Assign Doctor
        </Typography>

        <Paper elevation={3} sx={{ margin: 2 }}>
          <Box sx={{ padding: 1, margin: 10 }}>
          <Grid item md={12} lg={12}>
              <TextField
                id="name" // id is required
                label="Name"
                type="text"
                autoComplete="Doctor Name"
                variant="outlined"
                margin="normal"
                sx={{ width: "300px" }}
              />
            </Grid>
            <Grid item md={12} lg={12}>
              <TextField
                id="doc-dept-code" // id is required
                label="Department Code"
                type="number"
                autoComplete="Department Code"
                variant="outlined"
                margin="normal"
                sx={{ width: "300px" }}
              />
            </Grid>
            <Grid item md={12} lg={12}>
              <TextField
                id="email" // id is required
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
    </div>
  );
}
