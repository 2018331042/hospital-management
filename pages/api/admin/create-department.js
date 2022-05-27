import db from "../../../utils/db";
import { INSERT_ONE_DEPARTMENT } from "../../../utils/queries/sql-query";

export default async function handler(req, res) {

    console.log(req.body);
    const { deptName, deptCode } = req.body;
    const result = await db.query(INSERT_ONE_DEPARTMENT, [deptName, deptCode]);
    console.log({result});

  res.json("success");
}
