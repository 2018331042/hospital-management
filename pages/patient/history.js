import { Table, Title } from "@mantine/core";
import axios from "axios";
import React, { useEffect } from "react";
import Page from "../../components/page";
import { useAuth } from "../../utils/contexts/auth";
const elements = [
  { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
  { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
  { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
  { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
  { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
];
export default function history() {
  const { user } = useAuth();

  useEffect(async() => {
    const getpatientHistory = async() => {
        const response = await axios.post("/api/patient/history", {
            patientEmail: user.email,
        })
    }
  }, [user.email]);
  const rows = elements.map((element) => (
    <tr key={element.name}>
      <td>{element.position}</td>
      <td>{element.name}</td>
      <td>{element.symbol}</td>
      <td>{element.mass}</td>
    </tr>
  ));

  return (
    <Page>
      <Title> Pending List</Title>
      <Table>
        <thead>
          <tr>
            <th>Department</th>
            <th>Doctor Name</th>
            <th>Time</th>
            <th>Visit Fee</th>
            <th>Date</th>
            <th>current status</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <Title>Completed List</Title>
      <Table>
        <thead>
          <tr>
            <th>Department</th>
            <th>Doctor Name</th>
            <th>Time</th>
            <th>Visit Fee</th>
            <th>Date</th>
            <th>Current Status</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Page>
  );
}
