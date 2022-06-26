import * as Yup from "yup";

Yup.addMethod(Yup.string, "dobYear", function (errorMessage) {
  return this.test(`test-dob-year`, errorMessage, function (value) {
    const { path, createError } = this;
    console.log({value});
    return (
      new Date().toString() < value.toString() || createError({ path, message: errorMessage })
    );
  });
});

export const formSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "name must be at least 3 characters")
    .required("Name is required"),
  email: Yup.string().email("invalid email"),
  password: Yup.string()
    .min(6, "password must be at least 6 characters")
    .required("Password is required"),
  gender: Yup.string().required("gender is required"),
  dob: Yup.string().dobYear("please select the correct year"),
});
