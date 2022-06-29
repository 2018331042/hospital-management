import db from "../../../utils/db";
import { FIND_DOCTOR_BY_ID } from "../../../utils/queries/sql-query";

export default async function handler(req, res) {
  const { doctor_id } = req.body;
    console.log({ doctor_id });
  try {
    const result = await db.query(FIND_DOCTOR_BY_ID, [doctor_id]);
    console.log({result});
   
    if (result.length > 0) {
        const patientInfo = JSON.parse(JSON.stringify(result))
        console.log({patientInfo});
        return res.json({data: {patientInfo}, status: "SUCCESS", message: "Patient list found"});
    }
  } catch (err) {
    console.log({err});
    return res.json({status: "ERROR", message: "Error finding patient list", data: ""});
  }
}
