import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import bcrypt from "bcryptjs";
import router from "next/router";
import { useState } from "react";
const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const submitHandler = async() => {
        console.log({ email, password, name });

        const response = await axios.post("/api/patient/sign-up", {
            email,
            password: bcrypt.hashSync(password),
        })

        if(response.data.status === "success") router.push("/patient/sign-in");
    }
    return (
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "50vh", marginTop: "10vh" }}       
      >
        
        <Paper elevation={3} sx={{ margin: 2 }}>
        <Typography variant="h5" component="h1" sx={{ color: "Grey", fontWeight: 'bold' }} display="flex" justifyContent="center" marginTop="5vh">
          Sign Up
        </Typography>
          <Box sx={{ padding: 1, margin: 3 }}>
            <Grid item md={12} lg={12}>
            <TextField
                id="name" 
                label="Name"
                type="name"
                autoComplete="name"
                variant="outlined"
                margin="normal"
                sx={{ width: "300px" }}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
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
    )
}
export default SignUp;