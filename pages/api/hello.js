import Connection from "../../utils/db";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default async function handler(req, res) {
  await Connection.query('SELECT * from student', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
  });

  res.send("success");
}
