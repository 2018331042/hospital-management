import { useRouter } from "next/router";
import Page from "../../components/page";
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
} from "@mui/material";
import NextLink from "next/link";
import db from "../../utils/db";
import { GET_DEPT_DOCTORS } from "../../utils/queries/sql-query";
import { useAuth } from "../../utils/contexts/auth";
import axios from "axios";

export default function DoctorList({ doctorList }) {
  const router = useRouter();
  const {token, user} = useAuth();
  console.log({ router });

  const bookHandler = async(doc) => {
    console.log({doc})
    if(token === null){
      alert("Please login first");
      router.push("/patient/sign-in");
      return;
    }
    const response = await axios.post("/api/patient/book-doctor", {
      doc,
      email:user.email,
    })
    console.log({response});
    if(response.data.status === "SUCCESS"){
      alert("Booking successful");
      return;
    }
    alert("Booking failed");
    return;
  }
  return (
    <Page>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "gray",
        }}
      >
        <h1>Doctors of no: {router.query.deptCode} department</h1>
      </div>
      <Box sx={{ margin: 5 }}>
        <Grid container spacing={4}>
          {doctorList.map((doc) => (
            <Grid item md={3} xs={12} key={doc.id}>
              <Card
                sx={{
                  ":hover": {
                    boxShadow: 20,
                    border: "2px solid orange", // theme.shadows[20]
                    transitionDuration: "500ms",
                  },
                }}
              >
                <Grid container direction="column" spacing={1}>
                  <Grid item container md={3} xs={6}>
                    <Grid item xs>
                      <Container
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "column",
                        }}
                      >
                        <Avatar
                          alt={doc.DoctorName}
                          src={doc.DoctorImage}
                          sx={{
                            width: 220,
                            height: 220,
                            margin: 10,
                            display: "flex",
                          }}
                        />
                      </Container>
                    </Grid>
                  </Grid>
                  <Grid item container direction="column" md={8} xs={6}>
                    <Grid item xs alignItems="center" justifyContent="center">
                      <CardContent>
                        <List>
                          <ListItem
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              color: "Orange",
                            }}
                          >
                            <Typography component="h2" variant="h4">
                              {doc.name}
                            </Typography>
                          </ListItem>
                          <ListItem
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <Typography component="h4" variant="h6">
                              {doc.qualification}
                            </Typography>
                          </ListItem>
                          <ListItem
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <Typography component="h4" variant="h6">
                              seating time: {doc.start_time} - {doc.end_time}
                            </Typography>
                          </ListItem>
                          <ListItem
                            style={{
                              display: "flex",
                              justifyContent: "center",
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
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Page>
  );
}

export async function getServerSideProps(context) {
  console.log({ context });
  const dept_code = context.query.deptCode;

  const res = await db.query(GET_DEPT_DOCTORS, [dept_code]);
  console.log({ res });
  const doctorList = JSON.parse(JSON.stringify(res));
  console.log({ doctorList });
  return {
    props: {
      doctorList,
    },
  };
}
