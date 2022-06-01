import db from "../../../utils/db";
import { FIND_PATIENT, INSERT_PATIENT_ONE } from "../../../utils/queries/sql-query";

export default async function handler(req,res) {
    const {email, password} = req.body;
    console.log({email, password});


    try{
        const result = db.query(FIND_PATIENT, [email]);
        if(result.length > 0){
            return res.json({
                status: "ERROR",
                message: "User already exists"
            });
        }

        const response = db.query(INSERT_PATIENT_ONE, [email, password]);
        if(response.affectedRows > 0){
            return res.json({
                status: "SUCCESS",
                message: "User created successfully"
            });
        }
    }catch(err){
        console.log(err);
        return res.json({
            status: "ERROR",
            message: "Something went wrong"
        });
    }
}