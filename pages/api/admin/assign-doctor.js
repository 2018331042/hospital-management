import db from "../../../utils/db";
import bcrypt from "bcryptjs";
import {
  DEPT_EXIST,
  FIND_DOCTOR,
  INSERT_DOCTOR_ANALYTICS,
  INSERT_ONE_DOCTOR,
  UPDATE_DEPT_TOTAL_DOCTOR,
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
  console.log({password});
  const dbPassowrd = bcrypt.hashSync(password.toString());
  //changes the deptcode to integer as database type
  const code = parseInt(deptCode);
  try {
    const response = await db.query(DEPT_EXIST, [deptCode]);
    console.log({ response });
    // const {total_doctor} = response[0];
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
        const total_doctor = response[0].total_doctor + 1;
        const update_dept = await db.query(UPDATE_DEPT_TOTAL_DOCTOR,[total_doctor,deptCode]);
        console.log({ update_dept });
        /**GET THE DOCTOR ID USING THE UNIQUE EMAIL */
        const get_doc_id = await db.query(FIND_DOCTOR, [email]);
        console.log({id: get_doc_id[0]});
        const insert_doctor_analytics = await db.query(INSERT_DOCTOR_ANALYTICS, [get_doc_id[0].id]);
        console.log({insert_doctor_analytics});
        await sendEmail(
          email,
          "Welcome to Hospital Management System",
          `your account has been created successfully. your have been assigned to the ${response[0].name} department and your account password is ${password}. please don't share your password with anyone. Thank you.`
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
