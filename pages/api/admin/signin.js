import Connection from "../../../utils/db";
import { FIND_ADMIN } from "../../../utils/queries/sql-query";
export default async function handler(req, res) {
    const { email, password } = req.body;
    // console.log({email, password});
    await Connection.query(FIND_ADMIN,[email,password], function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
  });
    res.json({status: "success", message: "Signin success"});
}