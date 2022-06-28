import jwt from 'jsonwebtoken';
import db from '../../../utils/db';
import { FIND_PATIENT } from '../../../utils/queries/sql-query';


export default async function handler(req, res) {
    const {token} = req.body;
    const data = jwt.verify(token, process.env.JWT_SECRET);
    try{
        const response = await db.query(FIND_PATIENT, [data.email]);
        console.log({response});
        return res.json({status: "SUCCESS", data:response[0], message: "VERIFY_SUCCESS"});
    }catch(err){
        return res.json({status:"FAILED", message:err.message});
    }
}