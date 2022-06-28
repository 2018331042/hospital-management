import db from "../../utils/db";
import { GET_DEPT_INFO } from "../../utils/queries/sql-query";

export default async function handler(req, res) {
  try {
    console.log("called");
    // const result = await db.query(GET_DEPT_INFO);
    res.json({ data:"success" });
  } catch (err) {
    console.log({ err });
  }
}
