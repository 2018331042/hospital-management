import mysql from 'mysql';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'db_user',
  password: 'password',
  port: 6033,
  database: 'HospitalDB',
});

(async () => {
  try {
    await new Promise((resolve, reject) => {
      connection.connect((err, client) => {
        console.log({ client });
        if (err) {
          console.log({ err });
          reject(err);
        } else {
          console.log('connected');
          resolve();
        }
      });
    });
  } catch (err) {
    console.log({ err });
  }
})();

export default connection;
