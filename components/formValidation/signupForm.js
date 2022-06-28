import * as Yup from "yup";

export const formSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "name must be at least 3 characters")
    .required("Name is required"),
  email: Yup.string().email("invalid email"),
  password: Yup.string()
    .min(6, "password must be at least 6 characters")
    .required("Password is required"),
  gender: Yup.string().required("gender is required"),
});
