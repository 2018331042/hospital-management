import db from "../../../utils/db";
import { INSERT_ONE_DEPARTMENT } from "../../../utils/queries/sql-query";

export default async function handler(req, res) {

    console.log(req.body);
    const { deptName, deptCode } = req.body;
    try{

      const result = await db.query(INSERT_ONE_DEPARTMENT, [deptName, deptCode]);
      console.log({result});
      if(result.affectedRows > 0){
        return res.json({status:"SUCCESS", message:`You have successfully created ${deptName} department!!`});
      }

      return res.json({status:"UNSUCCESSFUL", message:`Something went wrong!!`});
    }catch(err){
      res.json({status:"UNSUCCESSFUL", message:err.message});
    }


}
