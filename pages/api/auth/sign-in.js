import bcryptjs from "bcryptjs";
import bcrypt from "bcryptjs/dist/bcrypt";
import db from "../../../utils/db";
import { FIND_ADMIN, FIND_DOCTOR, FIND_PATIENT } from "../../../utils/queries/sql-query";
import { createToken } from "../../../utils/token";
export default async function handler(req, res) {
  const { email, password, type } = req.body;

  let responseObject = {
    status: "",
    message: "",
    data: "",
  };

  if (type === "patient") {
    responseObject = await signInPatient(email, password, type);
  } else if (type === "doctor") {
    responseObject = await signInDoctor(email, password,type);
  } else if(type === "admin") {
    responseObject = await signInAdmin(email, password,type);
  }
  res.send(responseObject);
}

const signInPatient = async (email, password,type) => {
  try {
    const results = await db.query(FIND_PATIENT, [email]);
    console.log(results);
    if (results.length === 0) {
      return {
        status: "ERROR",
        message: "Patient not found",
        data: "",
      };
    }

    if (bcryptjs.compareSync(password, results[0].password)) {
      const user = results[0];
      const token = createToken(user, type);
      console.log({ token });
      return {
        status: "SUCCESS",
        message: "Patient signed in",
        data: { ...results[0], token, type },
      };
    }
  } catch (err) {
    console.log({ err });
    return {
      status: "ERROR",
      message: "Error signing in",
      data: "",
    };
  }
};

const signInDoctor = async (email, password,type) => {
    try {
      const results = await db.query(FIND_DOCTOR, [email]);
      console.log(results);
      if (results.length === 0) {
        return {
          status: "ERROR",
          message: "Patient not found",
          data: "",
        };
      }
  
      if (password === results[0].password) {
        const user = results[0];
        const token = createToken(user, "doctor");
        console.log({ token });
        return {
          status: "SUCCESS",
          message: "Patient signed in",
          data: { ...results[0], token, type },
        };
      }
    } catch (err) {
      console.log({ err });
      return {
        status: "ERROR",
        message: "Error signing in",
        data: "",
      };
    }
  };

  const signInAdmin = async (email, password,type) => {
    try {
      const results = await db.query(FIND_ADMIN, [email]);
      console.log(results);
      if (results.length === 0) {
        return {
          status: "ERROR",
          message: "Admin not found",
          data: "",
        };
      }
  
      if (password === results[0].password) {
        const user = results[0];
        const token = createToken(user, "admin");
        console.log({ token });
        return {
          status: "SUCCESS",
          message: "Admin signed in",
          data: { ...results[0], token, type },
        };
      }
    } catch (err) {
      console.log({ err });
      return {
        status: "ERROR",
        message: "Error signing in",
        data: "",
      };
    }
  };

