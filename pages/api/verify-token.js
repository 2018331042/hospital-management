import jwt from 'jsonwebtoken';
import Connection from '../../utils/db';
import { FIND_PATIENT } from '../../utils/queries/sql-query';


export default async function handler(req, res) {
    const {token} = req.body;


    try{
        const data = jwt.verify(token, process.env.JWT_SECRET);
        console.log({data});
        const {type} = data;
        Connection.query(FIND_PATIENT, [data.email], function (error, results, fields) {
        if (error) throw error;
        console.log({results});
        // const user = results[0];
           return res.json({status: "SUCCESS", data:{...results[0], isVerified:true, type:type}, message: "VERIFY_SUCCESS"});
        })
    }catch(err){
        return res.json({status: "FAILED", message: "INVALID_TOKEN", data: {isVerified: false}});
    }
}