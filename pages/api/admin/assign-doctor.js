import Connection from "../../../utils/db";
import sendEmail from "../../../utils/email";
import { INSERT_ONE_DOCTOR } from "../../../utils/queries/sql-query";

export default async function handler(req, res) {
    const {deptCode, email, password} = req.body;

    Connection.query(INSERT_ONE_DOCTOR, [email,password,deptCode], function(error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
    })

    await sendEmail(email, "Welcome to Hospital", "You have been assigned to a department");

    res.json("success");
}