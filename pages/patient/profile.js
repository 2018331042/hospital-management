import {
  Card,
  Image,
  Group,
  useMantineTheme,
  Avatar,
  Title,
  Grid,
} from "@mantine/core";
import axios from "axios";
import { useEffect } from "react";
import Page from "../../components/page";
import PatientProfile from "../../components/profiles/patientProfile";
import { useAuth } from "../../utils/contexts/auth";

function Profile() {
  let profileInfo;
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        console.log({token})
        const response = await axios.post("/api/patient/profile", {
          token,
        });
        console.log({ response });
         profileInfo = response.data.data;
      } catch (err) {}
    })();
  },[]);
  return (
    <Page>
      <PatientProfile profileInfo={profileInfo}/>
    </Page>
  );
}

export default Profile;
