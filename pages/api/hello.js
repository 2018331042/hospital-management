import db from "../../utils/db";
import Connection from "../../utils/db";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default async function handler(req, res) {
  const response = await db.query('SELECT * from ADMIN');
  console.log({ response });

  res.json("success");
}
