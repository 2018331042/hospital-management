export const INSERT_ONE_DEPARTMENT = `INSERT INTO DEPARTMENT (name, code) VALUES (?, ?)`;

export const INSERT_ONE_DOCTOR = `INSERT INTO DOCTOR 
(email, password, dept_code,name,qualification,start_time,end_time,patient_seat) VALUES (?,?,?,?,?,?,?,?)`;

export const INSERT_PATIENT_ONE = `INSERT INTO PATIENT (email, password, name, age, gender) VALUES (?,?,?,?,?)`;

export const FIND_PATIENT = `SELECT * FROM PATIENT WHERE email = ?`;

export const FIND_DOCTOR = `SELECT * FROM DOCTOR WHERE email = ?`;

export const FIND_ADMIN = `SELECT * FROM ADMIN WHERE email = ?`;

export const DEPT_EXIST = `SELECT * FROM DEPARTMENT WHERE code = ?`;

export const GET_DEPT_INFO = `SELECT * FROM DEPARTMENT`;

export const GET_DEPT_DOCTORS = `SELECT * FROM DOCTOR WHERE dept_code = ?`;

export const GET_DEPT_NAME = `SELECT name FROM DEPARTMENT WHERE code = ?`;

export const GET_DEPT_CODE_AND_NAME = `SELECT code, name FROM DEPARTMENT`;

export const INSERT_BOOKED_DOCTORS = `INSERT INTO BOOKED_DOCTORS (patient_email, doc_id, date) VALUES (?, ?, ?)`;

export const UPDATE_DEPT_TOTAL_DOCTOR = `UPDATE DEPARTMENT SET total_doctor = ? WHERE code = ?`;

export const FIND_DOCTOR_BY_ID = `SELECT BD.date, BD.id, P.email, P.name, P.gender FROM BOOKED_DOCTORS AS BD 
INNER JOIN PATIENT AS P ON
BD.patient_email = P.email WHERE BD.doc_id = ?`;

export const INSERT_DOCTOR_ANALYTICS = `INSERT INTO DOCTORS_ANALYTICS (doc_id) VALUES (?)`;

export const GET_DOCTOR_EARNINGS_ANALYTICS = `SELECT * FROM DOCTORS_ANALYTICS WHERE doc_id = ?`

export const UPDATE_DOCTOR_ANALYTICS = ``;
export const CREATE_DOCTOR_TABLE = `CREATE TABLE DOCTOR(
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(75) NOT NULL,
    name VARCHAR(30),
    qualification VARCHAR(75),
    start_time TIME,
    end_time TIME,
    patient_seat INTEGER,
    available_patient_seat INTEGER,
    dept_code INTEGER,
    FOREIGN KEY(dept_code) REFERENCES DEPARTMENT(code)
);

ALTER TABLE DOCTOR AUTO_INCREMENT=100;`;

export const CREATE_PATIENT_TABLE = `CREATE TABLE PATIENT(
   email VARCHAR(30) PRIMARY KEY,
   password VARCHAR(255),
   name VARCHAR(30),
   age INTEGER,
   gender VARCHAR(20)
)`;

export const CREATE_BOOKED_DOCTORS_TABLE = `CREATE TABLE BOOKED_DOCTORS(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    patient_email VARCHAR(75),
    doc_id INTEGER,
    
    FOREIGN KEY(patient_email) REFERENCES PATIENT(email),
    FOREIGN KEY(doc_id) REFERENCES DOCTOR(id)
)`;

export const CREATE_DOCTOR_ANALYTICS =  `CREATE TABLE DOCTORS_ANALYTICS (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    total_patient INTEGER NOT NULL,
    net_income INTEGER,
    withdrawn INTEGER,
    current_balance INTEGER,
    doc_id INTEGER NOT NULL,
    
    FOREIGN KEY(doc_id) REFERENCES DOCTOR(id)
  );`