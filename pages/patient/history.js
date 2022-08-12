import { Button, Modal, Table, Textarea, TextInput, Title } from "@mantine/core";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Page from "../../components/page";
import { useAuth } from "../../utils/contexts/auth";

export default function history() {
  const [pendingList, setPendingList] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const router = useRouter();
  const { user, } = useAuth();
  const [opened, setOpened] = useState(false);

  useEffect(async() => {
    const getpatientHistory = async() => {
        const response = await axios.post("/api/patient/history", {
            patientEmail: user.email,
        })
        const {data:{result}, status} = response.data;
        if(status === "success"){
          let pending = [];
          let completed = [];
          result.map((info) => {
            if(info.current_status === "PENDING"){
              pending.push(info)
            }else{
              completed.push(info);
            }
          })
          setPendingList(pending);
          setCompletedList(completed);
        }
    }
    await getpatientHistory();
  }, [user.email]);

  const handleCancel = () => {
    //TODO -- MODAL implementation
    console.log({cencel});
    setOpened(true);
  }

  const pendingRows = pendingList.map((element) => (
    <tr key={element.name}>
      <td>{element.name}</td>
      <td>{element.start_time}</td>
      <td>{element.visit_fee}</td>
      <td>{new Date(element.date).toLocaleDateString()}</td>
      <td><Button color="red" onClick={() => setOpened(true)}>CANCEL</Button></td>
    </tr>
  ));

  const completedRows =  completedList.map((element) => (
    <tr key={element.name}>
      <td>{element.name}</td>
      <td>{element.start_time}</td>
      <td>{element.visit_fee}</td>
      <td>{new Date(element.date).toLocaleDateString()}</td>
      <td><Button color="green" onClick={() => router.push(`/patient/prescription/${element.id}`)}>View Details</Button></td>
    </tr>
  ));

  return (
    <Page>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="WARNING!!!"
        centered
      >
       {/* <Title order={6}>Why do u want to cancel the event?</Title> */}
       <Textarea label="Why do u want to cancel the event?" required />
       <Button color="green" onClick={() => handleCancel()}>SUBMIT</Button>
      </Modal>
      <Title> UPCOMING EVENTS</Title>
      <Table>
        <thead>
          <tr>
            <th>Doctor Name</th>
            <th>Time</th>
            <th>Visit Fee</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {pendingRows}
        </tbody>
      </Table>
      <Title>COMPLETED EVENTS</Title>
      <Table>
        <thead>
          <tr>
            <th>Doctor Name</th>
            <th>Time</th>
            <th>Visit Fee</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>{completedRows}</tbody>
      </Table>
    </Page>
  );
}
