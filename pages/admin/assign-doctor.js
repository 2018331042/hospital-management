import {
  TextInput,
  Checkbox,
  Button,
  Group,
  Box,
  Title,
  NumberInput,
  Select,
} from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useState } from "react";
import { Check, X } from "tabler-icons-react";
import Page from "../../components/page";
import db from "../../utils/db";
import { GET_DEPT_CODE_AND_NAME } from "../../utils/queries/sql-query";
function AssignDoctor({ depts }) {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      deptCode: "",
      email: "",
      name: "",
      qualification: "",
      start_time: "00:00:00",
      end_time: "00:00:00",
      patient_seat: null,
    },
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    console.log({ values });
    const {
      email,
      deptCode,
      name,
      qualification,
      start_time,
      end_time,
      patient_seat,
    } = values;
    const response = await axios.post("/api/admin/assign-doctor", {
      deptCode,
      email,
      password: Math.floor(Math.random() * (1000000 - 100000) + 10000),
      name,
      qualification,
      start_time: start_time.toLocaleTimeString(),
      end_time: end_time.toLocaleTimeString(),
      patient_seat,
    });
    console.log({ response });
    const { status, message } = response.data;
    if (status === "SUCCESS") {
      setLoading(false);
      showNotification({
        allowClose: true,
        title: "SUCCESS",
        message: message,
        styles: (theme) => ({
          root: {
            backgroundColor: theme.colors.blue[6],
            borderColor: theme.colors.blue[6],

            "&::before": { backgroundColor: theme.white },
          },

          title: { color: theme.white },
          description: { color: theme.white },
          closeButton: {
            color: theme.white,
            "&:hover": { backgroundColor: theme.colors.blue[7] },
          },
        }),
        icon: <Check strokeWidth={2.5} color={"#55bf40"} size={48} />,
      });
      return;
    }
    setLoading(false);
    showNotification({
      allowClose: true,
      title: "UNSUCCESSFUL",
      message: message,
      styles: (theme) => ({
        root: {
          backgroundColor: theme.colors.blue[6],
          borderColor: theme.colors.blue[6],

          "&::before": { backgroundColor: theme.white },
        },

        title: { color: theme.white },
        description: { color: theme.white },
        closeButton: {
          color: theme.white,
          "&:hover": { backgroundColor: theme.colors.blue[7] },
        },
      }),
      icon: <X strokeWidth={2.5} color="red" size={48} />,
    });
    return;
  };

  return (
    <Page>
      <Box sx={{ maxWidth: 300, marginTop: "20vh" }} mx="auto">
        <div>
          <Title order={3} sx={{ textAlign: "center", marginTop: "40px" }}>
            ASSIGN DOCTOR
          </Title>
        </div>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Select
            label="choose department"
            placeholder="Pick one"
            data={depts.map((dept) => ({value:dept.code.toString(), label: dept.name}))}
            {...form.getInputProps("deptCode")}
          />
          <TextInput
            required
            label="email"
            placeholder="Doctor Email"
            {...form.getInputProps("email")}
          />
          <TextInput
            required
            label="name"
            placeholder="Doctor name"
            {...form.getInputProps("name")}
          />
          <TextInput
            required
            label="qualification"
            placeholder="Doctor qualification"
            {...form.getInputProps("qualification")}
          />
          <TimeInput
            required
            label="start time"
            format="12"
            withSeconds
            defaultValue={new Date()}
            {...form.getInputProps("start_time")}
          />
          <TimeInput
            required
            label="end time"
            format="12"
            withSeconds
            defaultValue={new Date()}
            {...form.getInputProps("end_time")}
          />
          <NumberInput
            required
            placeholder="Insert number of seat"
            label="patient seat"
            {...form.getInputProps("patient_seat")}
          />
          <Group position="right" mt="md">
            <Button type="submit" loading={loading}>
              Submit
            </Button>
          </Group>
        </form>
      </Box>
    </Page>
  );
}

export async function getServerSideProps(context) {
  const result = await db.query(GET_DEPT_CODE_AND_NAME);
  console.log({ result });
  const depts = JSON.parse(JSON.stringify(result));
  console.log({ depts });
  return {
    props: {
      depts,
    },
  };
}

export default AssignDoctor;
