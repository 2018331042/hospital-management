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
  Button,
} from '@mui/material';
import NextLink from 'next/link';
import db from '../../utils/db';
import { GET_DEPT_DOCTORS, GET_DEPT_NAME } from '../../utils/queries/sql-query';
import { useAuth } from '../../utils/contexts/auth';
import axios from 'axios';

export default function DoctorList({ doctorList, deptName }) {
  const router = useRouter();
  const { token, user } = useAuth();
  console.log({ router });

  const bookHandler = async (doc) => {
    console.log({ doc });
    if (token === null) {
      alert('Please login first');
      router.push('/patient/sign-in');
      return;
    }
    const response = await axios.post('/api/patient/book-doctor', {
      doc,
      email: user.email,
    });
    console.log({ response });
    if (response.data.status === 'SUCCESS') {
      alert('Booking successful');
      return;
    }
    alert('Booking failed');
    return;
  };
  return (
    <Page>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          // justifyContent: 'center',
          // alignItems: 'center',
          color: 'gray',
          marginBottom: 10,
          // marginTop: '.05rem',
          // padding: '.05rem',
        }}
      >
        <Typography
          variant="h4"
          sx={{ alignSelf: 'center', marginBottom: '2rem' }}
        >
          {deptName}
        </Typography>

        <Grid container spacing={2} alignItems="stretch">
          {doctorList.map((doc) => (
            <Grid item md={3} xs={12} key={doc.id}>
              <Card
                sx={{
                  ':hover': {
                    boxShadow: 20,
                    border: '2px solid orange', // theme.shadows[20]
                    transitionDuration: '500ms',
                  },
                }}
              >
                <Grid
                  container
                  direction="column"
                  spacing={1}
                  alignItems="stretch"
                >
                  <Container
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'column',
                      height: 280,
                      width: 220,
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
                          {doc.name}
                        </Typography>
                      </ListItem>
                      <ListItem
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography component="h4" variant="h6">
                          {doc.qualification}
                        </Typography>
                      </ListItem>
                      <ListItem
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography component="h4" variant="h6">
                          seating time: {doc.start_time} - {doc.end_time}
                        </Typography>
                      </ListItem>
                      <ListItem
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography component="h4" variant="h6">
                          patient seat: {doc.patient_seat}
                        </Typography>
                      </ListItem>
                    </List>
                    <Button
                      variant="contained"
                      onClick={(e) => bookHandler(doc)}
                    >
                      Book Now
                    </Button>
                  </CardContent>
                </Grid>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Page>
  );
}

export async function getServerSideProps(context) {
  console.log({ context });
  const dept_code = context.query.deptCode;

  const res = await db.query(GET_DEPT_DOCTORS, [dept_code]);
  const deptName = JSON.parse(
    JSON.stringify(await db.query(GET_DEPT_NAME, [dept_code]))
  );
  console.log({ res, deptName });
  const doctorList = JSON.parse(JSON.stringify(res));
  console.log({ doctorList });
  return {
    props: {
      doctorList,
      deptName: deptName[0].name,
    },
  };
}
