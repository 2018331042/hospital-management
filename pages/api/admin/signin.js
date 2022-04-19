import Connection from "../../../utils/db";
export default async function handler(req, res) {
    const { email, password } = req.body;
    // console.log({email, password});

    const sql = 'SELECT * from ADMIN where email = ? and password = ?';
    await Connection.query(sql,[email,password], function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
  });

    res.json({status: "success", message: "Signin success"});
}