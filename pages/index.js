import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import Page from '../components/page';
import NextLink from 'next/link';
import axios from 'axios';
import db from '../utils/db';
import { GET_DEPT_INFO } from '../utils/queries/sql-query';

export default function Home({ departments }) {
  return (
    <Page>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'gray',
          marginBottom: 10,
        }}
      >
        <h1>Our departments</h1>
      </div>
      <div>
        <Grid container spacing={3}>
          {departments.map((department) => (
            <Grid item md={3} xs={6} key={department.name}>
              <Card
                sx={{
                  boxShadow: 10,
                  ':hover': {
                    boxShadow: 20,
                    border: '3px solid gray', // theme.shadows[20]
                    transitionDuration: '500ms',
                    background: '#bde7ff',
                  },
                }}
              >
                <NextLink href={`department/${department.code}`} passHref>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image="/images/cardiology.jpg"
                      title={department.name}
                    ></CardMedia>
                    <CardContent>
                      <Typography>{department.name}</Typography>
                      <Typography>
                        Doctors: {department.total_doctor}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </NextLink>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Page>
  );
}

export async function getServerSideProps(ctx) {
  const res = await db.query(GET_DEPT_INFO);
  const departments = JSON.parse(JSON.stringify(res));
  console.log({ departments });
  return {
    props: {
      departments,
    },
  };
}
