import db from "../../../utils/db";
import { FIND_DOCTOR_BY_ID, GET_DOCTOR_EARNINGS_ANALYTICS } from "../../../utils/queries/sql-query";

export default async function handler(req, res) {
  const { doctor_id } = req.body;
    console.log({ doctor_id });
  try {
    const result = await db.query(FIND_DOCTOR_BY_ID, [doctor_id]);
    console.log({result});
    
    const earningsAndAnalytics = await db.query(GET_DOCTOR_EARNINGS_ANALYTICS, [doctor_id]);
    console.log({earningsAndAnalytics})
        const patientInfo = JSON.parse(JSON.stringify(result))
        return res.json({data: {patientInfo, earningsAndAnalytics}, status: "SUCCESS", message: "Patient list found"});
  } catch (err) {
    console.log({err});
    return res.json({status: "ERROR", message: "Error finding patient list", data: ""});
  }
}
