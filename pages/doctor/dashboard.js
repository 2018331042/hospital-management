import { Button, Collapse, Table } from "@mantine/core";
import axios from "axios";
import { useState } from "react";
import Page from "../../components/page";
import { useAuth } from "../../utils/contexts/auth";

const elements = [{ position: null, mass: null, symbol: "", name: "" }];

const rows = elements.map((element) => (
  <tr key={element.name}>
    <td>{element.position}</td>
    <td>{element.name}</td>
    <td>{element.symbol}</td>
    <td>{element.mass}</td>
  </tr>
));

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
  const handleOpen = async () => {
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
      <Button onClick={() => handleOpen()}>Today's Patient List</Button>

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
            </tr>
          </thead>
          <tbody>
            {patientInfo.map((info) => (
              <tr key={info.email}>
                <td>{info.email}</td>
                <td>{info.name}</td>
                <td>{info.gender}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Collapse>
    </Page>
  );
}

// {patientInfo.map((info) => (
//     <tr key={info.email}>
//       <td>{info.email}</td>
//       <td>{info.name}</td>
//       <td>{info.gender}</td>
//     </tr>
//   ))}
