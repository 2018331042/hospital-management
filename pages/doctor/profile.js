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
import axios from 'axios';
import { useAuth } from '../../utils/contexts/auth';

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
  const [info, setInfo] = useState();
  const [name, setNewName] = useState("");
  const [degree, setNewDegree] = useState("");
  const [email, setNewEmail] = useState("");
  const { user, isLoading } = useAuth();

  useEffect(async() => {
    const getDoctorProfileData = async() => {
      const response = await axios.post("/api/doctor/profile_data", {
        doc_id: user.id,
      })
      const {data:{result}, status} = response.data;
      console.log({result});
      if(result.length === 0 ) return null;
      setNewName(result[0].name);
      setNewEmail(result[0].email);
      setNewDegree(result[0].qualification);
      setInfo(result[0]);
    }
    await getDoctorProfileData();
  }, [user.email])

  const handleChange = async() =>{
    console.log({name, email, degree});
    const res = await axios.post("/api/doctor/update_profile", {
      name,
      degree,
      email,
      doc_id:user.id,
    })
  }

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
                  {info?.name}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography component="h2" variant="h2">
                  {info?.qualification}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography component="h3" variant="h3">
                  Chief Consultant, M.A.G Osmani Medical College hospital,
                  Sylhet
                </Typography>
              </ListItem>
              <ListItem>
                <EmailIcon />
                <Typography component="h3" variant="h3" sx={{ margin: 2 }}>
                  {info?.email}
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
                    placeholder={info?.name}
                    label="Full name"
                    value={name}
                    onChange={(e) => setNewName(e.currentTarget.value)}
                  />
                  <br />
                  <TextInput
                    placeholder="Your degree"
                    label="Degree"
                    value={degree}
                    onChange={(e) => setNewDegree(e.currentTarget.value)}
                  /> 
                  <br />
                  <TextInput value={email} placeholder="Your email" label="Email" onChange={(e) => setNewEmail(e.currentTarget.value)} />
                  <br />
                  <Button onClick={handleChange}>Save changes</Button>
                  <br />
                </Modal>
                <Group position="center">
                  <Button onClick={() => setOpened(true)}> Edit Profile</Button>
                </Group>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </ThemeProvider>
    </Page>
  );
}