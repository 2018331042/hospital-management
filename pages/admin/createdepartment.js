import { TextInput, Checkbox, Button, Group, Box, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useState } from "react";
import { Check, X } from "tabler-icons-react";
import Page from "../../components/page";
function CreateDept() {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      deptName: "",
      deptCode: null,
    },
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    console.log({ values });
    const { deptName, deptCode } = values;
    const response = await axios.post("/api/admin/create-department", {
      deptName,
      deptCode,
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
            CREATE DEPARTMENT
          </Title>
        </div>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <TextInput
            required
            label="Deptartment Name"
            placeholder="Department Name"
            {...form.getInputProps("deptName")}
          />
          <TextInput
            required
            label="Deptartment code"
            placeholder="Department code"
            {...form.getInputProps("deptCode")}
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

export default CreateDept;
