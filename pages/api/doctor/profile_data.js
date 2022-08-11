import db from "../../../utils/db";
import { GET_DOCTOR_INFO } from "../../../utils/queries/sql-query";

export default async function handler(req,res){
    const {doc_id} = req.body;
    console.log({doc_id});
    try{
        const result = await db.query(GET_DOCTOR_INFO, [doc_id])
        console.log({result});
        return res.json({data: {result}, status:"success"})
    }catch(err){
        console.log({err});
    }
}