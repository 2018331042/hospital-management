import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Appbar from "../../components/NavBar";

export default function CreateDepartment() {
  return (
    <>
      <Appbar />
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ marginTop: "10vh" }}
      >
        <Typography
          variant="h5"
          component="h1"
          sx={{ color: "Grey", fontWeight: "bold" }}
        >
          Create Department
        </Typography>
        <Paper elevation={3} sx={{ margin: 2 }}>
          <Box sx={{ margin: 10 }}>
            <Grid item md={12} lg={12}>
              <TextField
                id="dept_id" // id is required
                label="Department Name"
                type="text"
                autoComplete="Department Name"
                variant="outlined"
                margin="normal"
                sx={{ width: "300px" }}
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
                sx={{ width: "300px" }}
              />
            </Grid>
          </Box>
        </Paper>
        <Button variant="contained" color="secondary">
          Submit
        </Button>
      </Grid>
    </>
  );
}
