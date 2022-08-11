import db from "../../../utils/db";
import { GET_DOCTOR_EARNINGS_ANALYTICS, INSERT_BOOKED_DOCTORS } from "../../../utils/queries/sql-query";

export default async function handler(req, res) {
  const { doc, email } = req.body;
  try {
    const result = await db.query(INSERT_BOOKED_DOCTORS, [email, doc.id, 
      new Date(), "PENDING"]);
    // const setDoctorAnalytics = db.query(UPDATE_DOCTOR_ANALYTICS, [doc.id]);

    return res.json({ status: "SUCCESS", message: "Booked Successfully" });
  } catch (err) {
    console.log({ err });
    res.json({ status: "ERROR", message: err.message });
  }
}
