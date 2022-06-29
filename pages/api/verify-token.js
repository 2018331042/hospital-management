import jwt from "jsonwebtoken";
import db from "../../utils/db";
import { FIND_PATIENT } from "../../utils/queries/sql-query";

export default async function handler(req, res) {
  const { token } = req.body;

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    console.log({ data });
    // const { email, id, type } = data;
    return res.json({
      status: "SUCCESS",
      data: { ...data, isVerified: true },
      message: "VERIFY_SUCCESS",
    });
  } catch (err) {
    return res.json({
      status: "FAILED",
      message: "INVALID_TOKEN",
      data: { isVerified: false },
    });
  }
}
