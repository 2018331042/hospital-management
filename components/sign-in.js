import {
  TextInput,
  Checkbox,
  Button,
  Group,
  Box,
  PasswordInput,
  Loader,
  LoadingOverlay,
  Alert,
  Title,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import Page from "./page";
import * as Yup from "yup";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../utils/contexts/auth";
import { showNotification } from "@mantine/notifications";
import { Check, X } from "tabler-icons-react";
import Link from "next/link";

const formSchema = Yup.object().shape({
  email: Yup.string().email("invalid email"),
});

function SignIn({ type }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signIn } = useAuth();

  const form = useForm({
    schema: yupResolver(formSchema),
    initialValues: {
      email: "",
      password: "",
    },
  });

  const whichRouter = (type) => {
    switch (type) {
      case "patient":
        return "/";
      case "doctor":
        return "/doctor/dashboard";
      case "admin":
        return "/admin/dashboard";
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    console.log({ values });
    const { email, password } = values;
    const response = await signIn(email, password, type);
    const { status, message } = response;
    console.log({ response });
    if (status === "SUCCESS") {
      setLoading(false);
      const path = whichRouter(type);
      router.push(path);
      showNotification({
        allowClose: true,
        title: "Login Successful",
        message: "You have successfully logged in. Redirecting to dashboard...",
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
            {type.toUpperCase()} LOGIN
          </Title>
        </div>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
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

          <Group position="right" mt="md">
            <Button type="submit" color="green" loading={loading}>
              Submit
            </Button>
          </Group>
          {type === "patient" && (
            <div style={{ marginTop: "5px" }}>
              <Title order={6} sx={{ textAlign: "center" }}>
                Don't have an account?{" "}
                <Link href="/patient/sign-up">
                  <a style={{ color: "blue" }}>Sign Up</a>
                </Link>
              </Title>
            </div>
          )}
        </form>
      </Box>
    </Page>
  );
}

export default SignIn;
