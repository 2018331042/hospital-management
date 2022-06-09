import { Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useState } from 'react';
import Appbar from '../../components/NavBar';
import Page from '../../components/page';

export default function CreateDepartment() {
  const [deptName, setDeptName] = useState('');
  const [deptCode, setDeptCode] = useState('');
  const submitHandler = async () => {
    console.log({ deptName, deptCode });

    const response = await axios.post('/api/admin/create-department', {
      deptName,
      deptCode,
    });

    console.log({ response });
  };
  return (
    <Page>
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ marginTop: '10vh' }}
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
            Create Department
          </Typography>
          <Box sx={{ margin: 5 }}>
            <Grid item md={12} lg={12}>
              <TextField
                id="dept_id" // id is required
                label="Department Name"
                type="text"
                autoComplete="Department Name"
                variant="outlined"
                margin="normal"
                sx={{ width: '300px' }}
                onChange={(e) => setDeptName(e.target.value)}
              />
            </Grid>
            <Grid item md={12} lg={12}>
              <TextField
                id="dept_code" // id is required
                label="Department Code"
                type="number"
                autoComplete="Department Code"
                variant="outlined"
                margin="normal"
                sx={{ width: '300px' }}
                onChange={(e) => setDeptCode(e.target.value)}
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
}
