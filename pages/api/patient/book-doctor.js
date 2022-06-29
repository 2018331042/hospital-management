import db from "../../../utils/db";
import { INSERT_BOOKED_DOCTORS } from "../../../utils/queries/sql-query";

export default async function handler(req, res) {
  const { doc, email } = req.body;
  try {
    const result = await db.query(INSERT_BOOKED_DOCTORS, [email, doc.id]);
    console.log({ result });
    return res.json({ status: "SUCCESS", message: "Booked Successfully" });
  } catch (err) {
    console.log({ err });
    res.json({ status: "ERROR", message: err.message });
  }
}
