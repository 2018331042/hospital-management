import bcrypt from "bcryptjs/dist/bcrypt";
import Connection from "../../../utils/db";
import { FIND_PATIENT } from "../../../utils/queries/sql-query";
import { createToken } from "../../../utils/token";

export default async function handler(req,res) {
    const {email, password} = req.body;
    console.log({email, password});

     Connection.query(FIND_PATIENT, [email], function (error, results, fields) {
        if (error) throw error;
        console.log({results});
        if(results.length === 0){
            return res.json({status: "FAILED", message: "USER_DOSENT_EXISTS"});
        }

        if(bcrypt.compareSync(password, results[0].password)){
            const token = createToken(results[0], "patient");

            return res.json({status: "SUCCESS", data:{email:results[0].email, id:results[0].id, token}, message: "SIGNIN_SUCCESS"});
        }
        return res.json({status: "FAILED", message: "SIGNIN_FAILED"});
    });
}