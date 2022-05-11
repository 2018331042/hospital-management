import Connection from "../../../utils/db";
import { INSERT_ONE_DEPARTMENT } from "../../../utils/queries/sql-query";

export default async function handler(req, res) {

    console.log(req.body);
    const { deptName, deptCode } = req.body;
    Connection.query(INSERT_ONE_DEPARTMENT,[deptName,deptCode], function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
  });

  res.json("success");
}
