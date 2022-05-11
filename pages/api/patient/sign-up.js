import Connection from "../../../utils/db";
import { FIND_PATIENT, INSERT_PATIENT_ONE } from "../../../utils/queries/sql-query";

export default async function handler(req,res) {
    const {email, password} = req.body;
    console.log({email, password});

     Connection.query(FIND_PATIENT, [email], function (error, results, fields) {
        if (error) throw error;
        console.log({results});
        if(results.length > 0){
            return res.json({status: "FAILED", message: "USER_ALREADY_EXISTS"});
        }
    });

     Connection.query(INSERT_PATIENT_ONE, [email, password], function (error, results, fields) {
        if (error) throw error;

        if(results.affectedRows > 0){
            return res.json({status: "SUCCESS", message: "SIGNUP_SUCCESS"});
        }else{
            return res.json({status: "FAILED", message: "SIGNUP_FAILED"});
        }
    })
}