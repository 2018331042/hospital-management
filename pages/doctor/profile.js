import {
  Grid,
  Container,
  Avatar,
  List,
  ListItem,
  Typography,
  ListItemIcon,
  Card,
  CardContent,
  Input,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Page from '../../components/page';
import { fontWeight } from '@mui/system';
import AddAPhoto from '@mui/icons-material/AddAPhoto';
import { Modal, Group, TextInput, Button } from '@mantine/core';

export default function DoctorProfile() {
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: '2.5rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      h2: {
        fontSize: '1.5rem',
        fontWeight: 600,
        margin: '1rem 0',
        color: 'gray',
      },
      h3: {
        fontSize: '1.2rem',
        fontWeight: 200,
        margin: '1rem 0',
      },
      body1: {
        fontWeight: 'normal',
      },
    },
  });

  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const [opened, setOpened] = useState(false);

  function onImageChange(e) {
    setImages([...e.target.files]);
  }

  const router = useRouter();
  const selectImage = () => {
    console.log('select image');
  };
  return (
    <Page>
      <ThemeProvider theme={theme}>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <Container
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <Avatar
                alt="Arif"
                src={images}
                layout="responsive"
                sx={{
                  width: 300,
                  height: 300,
                  marginTop: 10,
                  marginBottom: 3,
                  display: 'flex',
                }}
              />
              {/* <AddAPhoto onClick={onImageChange} /> */}
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={onImageChange}
              />
            </Container>
          </Grid>
          <Grid item md={6} xs={12} sx={{ marginTop: 10 }}>
            <List>
              <ListItem>
                <Typography component="h1" variant="h1">
                  Dr. Tariful Islam Fahim
                </Typography>
              </ListItem>
              <ListItem>
                <Typography component="h2" variant="h2">
                  MBBS FCPS MD
                </Typography>
              </ListItem>
              <ListItem>
                <Typography component="h3" variant="h3">
                  Chief Consultant, M.A.G Osmani Medical College hospital,
                  Sylhet
                </Typography>
              </ListItem>
              <ListItem>
                <CallIcon />
                <Typography component="h3" variant="h3" sx={{ margin: 2 }}>
                  017420420420
                </Typography>
              </ListItem>
              <ListItem>
                <EmailIcon />
                <Typography component="h3" variant="h3" sx={{ margin: 2 }}>
                  arifshahriar@gmail.com
                </Typography>
              </ListItem>
              <ListItem>
                <Modal
                  opened={opened}
                  onClose={() => setOpened(false)}
                  title="Edit profile"
                  centered
                >
                  <TextInput
                    placeholder="Your name"
                    label="Full name"
                    required
                  />
                  <br />
                  <TextInput
                    placeholder="Your degree"
                    label="Degree"
                    required
                  />
                  <br />
                  <TextInput
                    placeholder="your current post"
                    label="Current Post"
                    required
                  />
                  <br />
                  <TextInput
                    placeholder="Your mobile"
                    label="Mobile"
                    required
                  />
                  <br />
                  <TextInput placeholder="Your email" label="Email" required />
                  <br />
                  <Button>Save changes</Button>
                  <br />
                </Modal>
                <Group position="center">
                  <Button onClick={() => setOpened(true)}> Edit Profile</Button>
                </Group>
              </ListItem>
            </List>
          </Grid>
          {/* <Grid
            item
            md={4}
            xs={12}
            alignItems="center"
            justify="center"
            sx={{ marginTop: 10 }}
          >
            <Card
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <CardContent>
                <Typography component="h3" variant="h3">
                  Monthly salary: 120k
                </Typography>
                <Typography component="h3" variant="h3">
                  Last payment: 12 May, 2022
                </Typography>
                <Typography component="h3" variant="h3">
                  Due Salary: 12 May, 2022
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={4} xs={12} sx={{ marginTop: 10 }}>
            <Card
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <CardContent>
                <Typography component="h3" variant="h3">
                  Monthly salary: 120k
                </Typography>
                <Typography component="h3" variant="h3">
                  Last payment: 12 May, 2022
                </Typography>
                <Typography component="h3" variant="h3">
                  Due Salary: 12 May, 2022
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={4} xs={12} sx={{ marginTop: 10 }}>
            <Card
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <CardContent>
                <Typography component="h3" variant="h3">
                  Patient per day: 50
                </Typography>
                <Typography component="h3" variant="h3">
                  Todays patient: 45
                </Typography>
                <Typography component="h3" variant="h3">
                  Total Income: 233434
                </Typography>
              </CardContent>
            </Card>
          </Grid> */}
        </Grid>
      </ThemeProvider>
    </Page>
  );
}
