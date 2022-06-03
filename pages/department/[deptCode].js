import { useRouter } from 'next/router';
import Page from '../../components/page';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Avatar,
  Container,
  Box,
  List,
  ListItem,
} from '@mui/material';
import NextLink from 'next/link';

const doctorList = [
  {
    DocId: 101,
    DoctorName: 'Arif',
    DoctorSpeciality: 'Cardiologist',
    DoctorImage:
      'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000',
  },
  {
    DocId: 102,
    DoctorName: 'Barif',
    DoctorSpeciality: 'Cardiologist',
    DoctorImage:
      'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000',
  },

  {
    DocId: 103,
    DoctorName: 'Carif',
    DoctorSpeciality: 'Cardiologist',
    DoctorImage:
      'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000',
  },
  {
    DocId: 102,
    DoctorName: 'Darif',
    DoctorSpeciality: 'Cardiologist',
    DoctorImage:
      'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000',
  },
  {
    DocId: 104,
    DoctorName: 'Earif',
    DoctorSpeciality: 'Cardiologist',
    DoctorImage:
      'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000',
  },
  {
    DocId: 105,
    DoctorName: 'Farif',
    DoctorSpeciality: 'Cardiologist',
    DoctorImage:
      'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000',
  },
  {
    DocId: 106,
    DoctorName: 'Garif',
    DoctorSpeciality: 'Cardiologist',
    DoctorImage:
      'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000',
  },
  {
    DocId: 107,
    DoctorName: 'Harif',
    DoctorSpeciality: 'Cardiologist',
    DoctorImage:
      'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000',
  },
  {
    DocId: 108,
    DoctorName: 'Iarif',
    DoctorSpeciality: 'Cardiologist',
    DoctorImage:
      'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000',
  },
];

export default function DoctorList() {
  const router = useRouter();
  console.log({ router });
  return (
    <Page>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'gray',
        }}
      >
        <h1>Doctors of no: {router.query.deptCode} department</h1>
      </div>
      <Box sx={{ margin: 5 }}>
        <Grid container spacing={4}>
          {doctorList.map((doc) => (
            <Grid item md={3} xs={12} key={doc.DocId}>
              <Card>
                <NextLink href={`department/${doc.DoctorName}`} passHref>
                  <CardActionArea style={{ justifyContent: 'center' }}>
                    <Grid container direction="column" spacing={1}>
                      <Grid item container md={3} xs={6}>
                        <Grid item xs>
                          <Container
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              flexDirection: 'column',
                            }}
                          >
                            <Avatar
                              alt={doc.DoctorName}
                              src={doc.DoctorImage}
                              sx={{
                                width: 220,
                                height: 220,
                                margin: 10,
                                display: 'flex',
                              }}
                            />
                          </Container>
                        </Grid>
                      </Grid>
                      <Grid item container direction="column" md={8} xs={6}>
                        <Grid
                          item
                          xs
                          alignItems="center"
                          justifyContent="center"
                        >
                          <CardContent>
                            <List>
                              <ListItem
                                style={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  color: 'Orange',
                                }}
                              >
                                <Typography component="h2" variant="h4">
                                  {doc.DoctorName}
                                </Typography>
                              </ListItem>
                              <ListItem
                                style={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                }}
                              >
                                <Typography component="h4" variant="h6">
                                  {doc.DoctorSpeciality}
                                </Typography>
                              </ListItem>
                            </List>
                          </CardContent>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardActionArea>
                </NextLink>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Page>
  );
}
