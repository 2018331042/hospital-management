import { Button, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

export default function AssignDoctor() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log('here');
  const submitHandler = () => {
    console.log({email, password});
  }
  return (

    <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" sx={{minHeight:'50vh'}}>
         <Typography variant='h6' sx={{}}>
          Assign Doctor
        </Typography>
      <Grid item md={12} lg={12}>
      <TextField
       id="email"
       label="Email"
       type="Email"
       autoComplete="Email"
       margin='normal'
       variant="outlined"
       onChange={(e) => setEmail(e.target.value)}
     />
    </Grid>
    <Grid item >
      <TextField
       id="password"
       label="Password"
       type="password"
       autoComplete="current-password"
       variant="outlined"
       margin='normal'
       onChange={(e) => setPassword(e.target.value)}
     />
    </Grid>
     <Button variant='contained' color="secondary" onClick={submitHandler}>
       Submit
     </Button>
     
    </Grid>


  )
}
