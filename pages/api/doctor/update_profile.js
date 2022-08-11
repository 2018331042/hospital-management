import db from "../../../utils/db";
import {UPDATE_DOCTOR_PROFILE } from "../../../utils/queries/sql-query";

export default async function handler(req,res){
    const {doc_id, name, email, degree} = req.body;
    console.log({doc_id, name, email, degree});
    try{
        const result = await db.query(UPDATE_DOCTOR_PROFILE, [name, email, degree, doc_id])
        console.log({result});
        // return res.json({data: {result}, status:"success"})
    }catch(err){
        console.log({err});
    }
}