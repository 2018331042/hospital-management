import {
  TextInput,
  Checkbox,
  Button,
  Group,
  Box,
  PasswordInput,
  Title,
  Select,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import Page from "../../components/page";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../utils/contexts/auth";
import { showNotification } from "@mantine/notifications";
import { Check, X } from "tabler-icons-react";
import { DatePicker } from "@mantine/dates";
import axios from "axios";
import bcrypt from "bcryptjs";
import { formSchema } from "../../components/formValidation/signupForm";
import Link from "next/link";

function SignIn() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    schema: yupResolver(formSchema),
    initialValues: {
      name: "aaa",
      email: "a@gmail.com",
      password: "123advcs",
      gender: "Male",
      dob: "",
    },
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    console.log({ values });
    const { email, password, gender, dob, name } = values;
    if(new Date().getFullYear() < dob.getFullYear()){
      setLoading(false);
      showNotification({
        allowClose: true,
        title: "INVALID YEAR",
        message: "please enter valid date of birth",
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
        autoClose: 5000,
      });
      return;
    }
    const response = await axios.post("/api/patient/sign-up", {
      name,
      email,
      password: bcrypt.hashSync(password, 10),
      gender,
      age: parseInt(new Date().toISOString().substr(0,4))-parseInt(dob.toISOString().substr(0,4)) ,
    });
    const { status, message } = response.data;
    console.log({ response });
    if (status === "SUCCESS") {
      setLoading(false);
      router.push("/patient/sign-in");
      showNotification({
        allowClose: true,
        title: "Registered Successful",
        message:
          "You have successfully Registered. Redirecting to Login page...",
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
      title: "Login Unsccessful",
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
            PATIENT REGISTER
          </Title>
        </div>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <TextInput
            required
            label="name"
            placeholder="your name"
            {...form.getInputProps("name")}
          />
          <TextInput
            required
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            required
            label="password"
            placeholder="password"
            {...form.getInputProps("password")}
          />
          <Select
            required
            label="gender"
            placeholder="Pick one"
            data={["Male", "Female"]}
            {...form.getInputProps("gender")}
          />
          <DatePicker
            placeholder="Pick date"
            label="Date of Birth"
            required
            {...form.getInputProps("dob")}
          />
          <Group position="right" mt="md">
            <Button type="submit" color="green" loading={loading}>
              Submit
            </Button>
          </Group>
          <div style={{ marginTop: "5px" }}>
              <Title order={6} sx={{ textAlign: "center" }}>
                Already have an account?{" "}
                <Link href="/patient/sign-in">
                  <a style={{ color: "blue" }}>Sign in</a>
                </Link>
              </Title>
            </div>
        </form>
      </Box>
    </Page>
  );
}

export default SignIn;
