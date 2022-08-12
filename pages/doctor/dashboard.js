/* eslint-disable react-hooks/exhaustive-deps */
import {
  Badge,
  Button,
  Card,
  Center,
  Collapse,
  Container,
  Grid,
  Group,
  Image,
  Modal,
  Paper,
  Table,
  Text,
  TextInput,
} from '@mantine/core';
import dayjs from 'dayjs';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Page from '../../components/page';
import { useAuth } from '../../utils/contexts/auth';
import { useScrollIntoView } from '@mantine/hooks';
import { urlObjectKeys } from 'next/dist/shared/lib/utils';
import { TimeRangeInput } from '@mantine/dates';

export default function DoctorDashBoard() {
  const [curOpened, setCurOpen] = useState(false);
  const [prevOpened, setPrevOpen] = useState(false);
  const [openedFirst, setOpenedFirst] = useState(false);
  const [openedSecond, setOpenedSecond] = useState(false);
  const [openedThird, setOpenedThird] = useState(false);
  const [openedFourth, setOpenedFourth] = useState(false);
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

  const now = new Date();
  const then = dayjs(now).add(30, 'minutes').toDate();
  // const [value, setValue] = useState < [Date, Date] > [now, then];

  const { user } = useAuth();
  const router = useRouter();

  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView();

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
          console.log({
            check:
              new Date().toDateString() === new Date(info.date).toDateString(),
          });
          if (
            new Date().toDateString() === new Date(info.date).toDateString()
          ) {
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
  }, [user.email]);

  return (
    <Page>
      <Modal
        opened={openedFirst}
        onClose={() => setOpenedFirst(false)}
        title="Money Withdrawal"
        centered
      >
        <TextInput placeholder="type amount" label="Amount" />
        <br />
        <Button>Withdraw</Button>
        <br />
      </Modal>

      <Modal
        opened={openedSecond}
        onClose={() => setOpenedSecond(false)}
        title="Request to change office hour"
        centered
      >
        <TimeRangeInput
          label="Office hour"
          // value={value}
          // onChange={setValue}
          clearable
        />
        <br />
        <Button>Request Change</Button>
        <br />
      </Modal>

      <Modal
        opened={openedThird}
        onClose={() => setOpenedThird(false)}
        title="Request to change visit fee"
        centered
      >
        <TextInput placeholder="type amount" label="Amount" />
        <br />
        <Button>Request Change</Button>
        <br />
      </Modal>

      <Modal
        opened={openedFourth}
        onClose={() => setOpenedFourth(false)}
        title="Request to change patient number"
        centered
      >
        <TextInput placeholder="type number" label="Total patient a day" />
        <br />
        <Button>Request Change</Button>
        <br />
      </Modal>

      <Container
        sx={{
          marginLeft: 100,
          alignItems: 'center',
        }}
      >
        <Button
          variant="gradient"
          gradient={{ from: 'teal', to: 'lime', deg: 105 }}
          onClick={() => setCurOpen((o) => !o)}
        >
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
              {/* {console.log(prevPatientInfo)} */}
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
          <Button
            variant="gradient"
            gradient={{ from: 'orange', to: 'red' }}
            onClick={() => setPrevOpen((o) => !o)}
          >
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
                {/* {console.log(prevPatientInfo)} */}
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

        <div style={{ marginTop: '5rem' }}>
          <Text align="center" weight={700} size="lg" sx={{ margin: 5 }}>
            {' '}
            Analytics{' '}
          </Text>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Grid style={{ textAlign: 'center' }}>
              <Grid.Col span={3}>
                <div>Total earning</div>
                <div>5</div>
              </Grid.Col>
              <Grid.Col span={3}>
                <div>Total Patient</div>
              </Grid.Col>
              <Grid.Col span={3}>
                <div>Pending Patient</div>
              </Grid.Col>
              <Grid.Col span={3}>
                <div>Credit</div>
              </Grid.Col>
            </Grid>
          </Card>
        </div>
        <Center sx={{ marginTop: 50 }}>
          <Button onClick={() => setOpenedFirst(true)}>Withdraw money</Button>
        </Center>

        <div style={{ marginTop: '5rem' }}>
          <Text align="center" weight={700} size="lg" sx={{ margin: 5 }}>
            {' '}
            Request to Admin{' '}
          </Text>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Grid style={{ textAlign: 'center' }}>
              <Grid.Col span={4}>
                <Button onClick={() => setOpenedSecond(true)}>
                  Change Office hour
                </Button>
              </Grid.Col>
              <Grid.Col span={4}>
                <Button onClick={() => setOpenedThird(true)}>
                  Update visit fee
                </Button>
              </Grid.Col>
              <Grid.Col span={4}>
                <Button onClick={() => setOpenedFourth(true)}>
                  Change patient number
                </Button>
              </Grid.Col>
            </Grid>
          </Card>
        </div>
      </Container>
    </Page>
  );
}
