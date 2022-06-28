export const INSERT_ONE_DEPARTMENT = `INSERT INTO DEPARTMENT (name, code) VALUES (?, ?)`;

export const INSERT_ONE_DOCTOR = `INSERT INTO DOCTOR (email, password, dept_code) VALUES (?, ?, ?)`;

export const INSERT_PATIENT_ONE = `INSERT INTO PATIENT (email, password, name, age, gender) VALUES (?,?,?,?,?)`;

export const FIND_PATIENT = `SELECT * FROM PATIENT WHERE email = ?`;

export const FIND_DOCTOR = `SELECT * FROM DOCTOR WHERE email = ?`;

export const FIND_ADMIN = `SELECT * FROM ADMIN WHERE email = ?`;

export const DEPT_EXIST = `SELECT * FROM DEPARTMENT WHERE code = ?`;

export const GET_DEPT_INFO = `SELECT * FROM DEPARTMENT`;

export const CREATE_DOCTOR_TABLE = `CREATE TABLE DOCTOR(
   id INTEGER PRIMARY KEY,
   email VARCHAR(30) NOT NULL,
   password VARCHAR(30) NOT NULL,
   age INTEGER,
   name VARCHAR(30),
   dept_code INTEGER,
   FOREIGN KEY(dept_code) REFERENCES DEPARTMENT(code)
)`;

export const CREATE_PATIENT_TABLE = `CREATE TABLE PATIENT(
   email VARCHAR(30) PRIMARY KEY,
   password VARCHAR(255),
   name VARCHAR(30),
   age INTEGER,
   gender VARCHAR(20)
)`;
