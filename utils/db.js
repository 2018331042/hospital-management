import mysql from 'serverless-mysql';

const db = mysql({
  config: {
    host: 'localhost',
    user: 'db_user',
    password: 'db_user_pass',
    port: 6033,
    database: 'HospitalDB',
  },
});

export default db;
