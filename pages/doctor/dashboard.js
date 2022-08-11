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
  Title,
} from "@mantine/core";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Page from "../../components/page";
import { useAuth } from "../../utils/contexts/auth";

export default function DoctorDashBoard() {
  const [curOpened, setCurOpen] = useState(false);
  const [prevOpened, setPrevOpen] = useState(false);
  const [curPatientInfo, setCurPatientInfo] = useState([
  ]);
  const [prevPatientInfo, setPrevPatientInfo] = useState([
  ]);
  const [analytics, setAnalytics] = useState();

  const { user } = useAuth();
  const router = useRouter();

  useEffect(async () => {
    const getDashBoardData = async () => {
      console.log({ user });
      const response = await axios.post("/api/doctor/patient-list", {
        doctor_id: user.id,
      });
      console.log({ response });
      const {
        data: { patientInfo, earningsAndAnalytics },
        status,
        message,
      } = response.data;
      console.log({ patientInfo });
      console.log({anlytics: earningsAndAnalytics[0]});
      if (status === "SUCCESS") {
        setAnalytics(earningsAndAnalytics[0]);
        let currentPatient = [];
        let prevPatient = [];
        patientInfo.map((info) => {
          console.log({check: new Date().toDateString() === new Date(info.date).toDateString()})
          if (new Date().toDateString() === new Date(info.date).toDateString()) {
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
      <div style={{ marginTop: "5rem" }}>
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
    
      <div style={{ marginTop: ".5rem" }}>
        {console.log({analytics})}
        <Title>DOCTOR EARNINGS AND ANALYTICS</Title>
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Grid style={{textAlign:"center"}}>
            <Grid.Col span={3}>
              <div >Total earning</div>
              <div>{analytics?.net_income}</div>
            </Grid.Col>
            <Grid.Col span={3}>
              <div>Total Patient</div>
              <div>{analytics?.total_patient}</div>
            </Grid.Col>
            <Grid.Col span={3}>
              <div>withdrawn</div>
              <div>{analytics?.withdrawn}</div>
            </Grid.Col>
            <Grid.Col span={3}>
              <div>Available For widrawal</div>
              <div>{analytics?.current_balance}</div>
            </Grid.Col>
          </Grid>
        </Card>
      </div>
    </Page>
  );
}
