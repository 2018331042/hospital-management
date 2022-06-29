import db from "../../../utils/db";
import bcrypt from "bcryptjs";
import {
  DEPT_EXIST,
  INSERT_ONE_DOCTOR,
} from "../../../utils/queries/sql-query";
import sendEmail from "../../../utils/email";

export default async function handler(req, res) {
  const {
    deptCode,
    email,
    password,
    name,
    qualification,
    start_time,
    end_time,
    patient_seat,
  } = req.body;
  const dbPassowrd = bcrypt.hashSync(password.toString());
  //changes the deptcode to integer as database type
  const code = parseInt(deptCode);
  try {
    const response = await db.query(DEPT_EXIST, [deptCode]);
    console.log({ response });
    if (response.length > 0) {
      const result = await db.query(INSERT_ONE_DOCTOR, [
        email,
        dbPassowrd,
        code,
        name,
        qualification,
        start_time,
        end_time,
        patient_seat,
      ]);
      console.log({ result });
      if (result.affectedRows > 0) {
        await sendEmail(
          email,
          "Welcome to Hospital Management System",
          `your account has been created successfully. your have been assigned to the ${response[0].name} department and your account password is${password}. please don't share your password with anyone. Thank you.`
        );
        return res.json({
          status: "SUCCESS",
          message: `You have successfully assigned ${email} to the ${response[0].name} department!!`,
        });
      }
    }
    return res.json({
      status: "UNSUCCESSFUL",
      message: "something went wrong",
    });
  } catch (err) {
    res.json({ status: "UNSUCCESSFUL", message: err.message });
  }
}
