import { Button, Collapse, Table } from "@mantine/core";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Page from "../../components/page";
import { useAuth } from "../../utils/contexts/auth";

export default function DoctorDashBoard() {
  const [opened, setOpen] = useState(false);
  const [patientInfo, setPatientInfo] = useState([
    {
      email: "",
      name: "",
      gender: null,
    },
  ]);
  const { user } = useAuth();
  const router = useRouter()
  const handleOpen = async () => {

    if(opened){
      setOpen((o) => !o);
      return;
    }
    const response = await axios.post("/api/doctor/patient-list", {
      doctor_id: user.id,
    });
    console.log({ response });
    const {
      data: { patientInfo },
      status,
      message,
    } = response.data;
    console.log({ patientInfo });
    if (status === "SUCCESS") {
      setPatientInfo(patientInfo);
      setOpen((o) => !o);
    }
  };
  return (
    <Page>
      <Button onClick={() => handleOpen()}>Today&apos;s Patient List</Button>

      <Collapse
        in={opened}
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
            {patientInfo.map((info) => (
              <tr key={info.email}>
                <td>{info.email}</td>
                <td>{info.name}</td>
                <td>{info.gender}</td>
                <td><Button onClick={() => router.push(`/doctor/prescription/${info.id}`)}>check</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Collapse>
    </Page>
  );
}
