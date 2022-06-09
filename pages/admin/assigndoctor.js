import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import Appbar from '../../components/NavBar';
import Page from '../../components/page';

export default function AssignDoctor() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [deptCode, setDeptCode] = useState('');
  console.log('here');
  const submitHandler = async () => {
    console.log({ email, password, deptCode });

    const response = await axios.post('/api/admin/assign-doctor', {
      email,
      password,
      deptCode,
    });

    console.log({ response });
  };
  return (
    <Page>
      <div>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: '50vh', marginTop: '10vh' }}
        >
          <Paper elevation={3} sx={{ margin: 2 }}>
            <Typography
              variant="h5"
              component="h1"
              sx={{ color: 'Grey', fontWeight: 'bold' }}
              display="flex"
              justifyContent="center"
              marginTop="5vh"
            >
              Assign Doctor
            </Typography>
            <Box sx={{ padding: 1, margin: 3 }}>
              <Grid item md={12} lg={12}>
                <TextField
                  id="doc-dept-code" // id is required
                  label="Department Code"
                  type="number"
                  autoComplete="Department Code"
                  variant="outlined"
                  margin="normal"
                  sx={{ width: '300px' }}
                  onChange={(e) => setDeptCode(e.target.value)}
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
                  sx={{ width: '300px' }}
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
                  sx={{ width: '300px' }}
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
    </Page>
  );
}
