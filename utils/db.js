import mysql from 'mysql';

const connection = mysql.createConnection({
    host: "localhost",
    user: "db_user",
    password: "db_user_pass",
    port: 6033,
    database: "CheckDataBase"
});

connection.connect((err, client) => {
    console.log({ client })
    if (err) {
        console.log({ err });
    } else {
        console.log("connected");
    }
})



export default connection;
