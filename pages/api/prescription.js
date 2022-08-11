import db from "../../utils/db";
import { INSERT_PRESCRIPTION_AND_STATUS } from "../../utils/queries/sql-query";

export default async function handler(req,res){
    const {prescribeId, text} = req.body;
    console.log({prescribeId, text});
    try{
        const result  = await db.query(INSERT_PRESCRIPTION_AND_STATUS, [text, "COMPLETED", prescribeId])
        console.log({result});
    }catch(err){
        console.log({err});
    }
}