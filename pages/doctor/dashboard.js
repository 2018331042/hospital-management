/* eslint-disable react-hooks/exhaustive-deps */
import {
  Badge,
  Button,
  Card,
  Collapse,
  Grid,
  Group,
  Image,
  Table,
  Text,
} from '@mantine/core';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Page from '../../components/page';
import { useAuth } from '../../utils/contexts/auth';

export default function DoctorDashBoard() {
  const [curOpened, setCurOpen] = useState(false);
  const [prevOpened, setPrevOpen] = useState(false);
  const [curPatientInfo, setCurPatientInfo] = useState([
    {
      email: '',
      name: '',
      gender: null,
    },
  ]);
  const [prevPatientInfo, setPrevPatientInfo] = useState([
    {
      email: '',
      name: '',
      gender: null,
    },
  ]);

  const { user } = useAuth();
  const router = useRouter();

  useEffect(async () => {
    const getDashBoardData = async () => {
      console.log({ user });
      const response = await axios.post('/api/doctor/patient-list', {
        doctor_id: user.id,
      });
      console.log({ response });
      const {
        data: { patientInfo },
        status,
        message,
      } = response.data;
      console.log({ patientInfo });
      if (status === 'SUCCESS') {
        let currentPatient = [];
        let prevPatient = [];
        patientInfo.map((info) => {
          if (new Date() === new Date(info.date)) {
            currentPatient.push(info);
            console.log({ currentPatient });
          } else {
            prevPatient.push(info);
            console.log({ prevPatient });
          }
        });
        setCurPatientInfo(currentPatient);
        setPrevPatientInfo(prevPatient);
      }
    };
    await getDashBoardData();
    console.log({ curPatientInfo });
    console.log({ prevPatientInfo });
  }, [user.email]);
  return (
    <Page>
      <Button onClick={() => setCurOpen((o) => !o)}>
        Today&apos;s Patient List
      </Button>
      <Collapse
        in={curOpened}
        transitionDuration={500}
        transitionTimingFunction="linear"
      >
        <Table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {console.log(prevPatientInfo)}
            {curPatientInfo?.map((info) => (
              <tr key={info.email}>
                <td>{info.email}</td>
                <td>{info.name}</td>
                <td>{info.gender}</td>
                {/* <td>{info.date}</td> */}
                <td>
                  <Button
                    onClick={() =>
                      router.push(`/doctor/prescription/${info.id}`)
                    }
                  >
                    check
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Collapse>
      <div style={{ marginTop: '5rem' }}>
        <Button onClick={() => setPrevOpen((o) => !o)}>
          Previous Patient List
        </Button>
        <Collapse
          in={prevOpened}
          transitionDuration={500}
          transitionTimingFunction="linear"
        >
          <Table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {console.log(prevPatientInfo)}
              {prevPatientInfo?.map((info) => (
                <tr key={info.email}>
                  <td>{info.email}</td>
                  <td>{info.name}</td>
                  <td>{info.gender}</td>
                  {/* <td>{info.date}</td> */}
                  <td>
                    <Button
                      color="green"
                      onClick={() =>
                        router.push(`/doctor/prescription/${info.id}`)
                      }
                    >
                      completed
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Collapse>
      </div>
      <div style={{ marginTop: '.5rem' }}>
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Grid style={{ textAlign: 'center' }}>
            <Grid.Col span={2}>
              <div>Total earning</div>
              <div>5</div>
            </Grid.Col>
            <Grid.Col span={2}>
              <div>Total Patient</div>
            </Grid.Col>
          </Grid>
        </Card>
      </div>
    </Page>
  );
}
