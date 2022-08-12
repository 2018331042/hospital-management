import db from "../../../utils/db";
import { GET_PATEINT_HISTORY } from "../../../utils/queries/sql-query";

export default async function handler(req, res){

    const {patientEmail} = req.body;

    try{
        const result = await db.query(GET_PATEINT_HISTORY, [patientEmail])
        console.log({result});

        return res.json({data:{result}, status:"success"});
    }catch(err){
        console.log({err});
    }
}