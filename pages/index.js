import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import Page from '../components/page';
import { useAuth } from '../utils/contexts/auth';
import NextLink from 'next/link';

const departments = [
  {
    deptName: 'Cardiology',
    numberOfDoctors: '10',
    deptCode: 1,
    image: '/images/cardiology.jpg',
  },
  {
    deptName: 'Dermatology',
    numberOfDoctors: '10',
    deptCode: 2,
    image: '/images/cardiology.jpg',
  },
  {
    deptName: 'Gastroenterology',
    numberOfDoctors: '10',
    deptCode: 3,
    image: '/images/cardiology.jpg',
  },
  {
    deptName: 'General Surgery',
    numberOfDoctors: '10',
    deptCode: 4,
    image: '/images/cardiology.jpg',
  },
  {
    deptName: 'Neurology',
    numberOfDoctors: '10',
    deptCode: 5,
    image: '/images/cardiology.jpg',
  },
  {
    deptName: 'Nephrology',
    numberOfDoctors: '10',
    deptCode: 6,
    image: '/images/cardiology.jpg',
  },
];

export default function Home() {
  const { isLoggedIn, isLoading, token, user } = useAuth();
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
            <Grid item md={3} xs={6} key={department.deptName}>
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
                <NextLink href={`department/${department.deptCode}`} passHref>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={department.image}
                      title={department.deptName}
                    ></CardMedia>
                    <CardContent>
                      <Typography>{department.deptName}</Typography>
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
