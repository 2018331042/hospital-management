import connection from '../../../utils/db';
import { createToken } from '../../../utils/token';
import { FIND_PATIENT } from '../../../utils/queries/sql-query';

export default async function handler(req, res) {
  const { email, password, type } = req.body;

  let responseObject = {
    status: '',
    message: '',
  };

  if (type === 'patient') {
    responseObject = await signInWithPatient(email, password);
  } else if (type === 'doctor') {
    responseObject = signInWithDoctor(email, password);
  } else if (type === 'admin') {
    responseObject = signInWithAdmin(email, password);
  }
  console.log({ responseObject });
}

const signInWithPatient = async (email, password) => {
  try {
    await connection.query(
      FIND_PATIENT,
      [email],
      function (error, results, fields) {
        if (error) throw error;
        console.log({ results });
        if (results.length === 0) {
          console.log('here');
          return { status: 'FAILED', message: 'USER_DOSENT_EXISTS' };
        }

        if (bcrypt.compareSync(password, results[0].password)) {
          const token = createToken(results[0], 'patient');

          return {
            status: 'SUCCESS',
            data: { email: results[0].email, id: results[0].id, token },
            message: 'SIGNIN_SUCCESS',
          };
        }
      }
    );
  } catch (err) {
    console.log({ err });
    return { status: 'FAILED', message: 'SIGNIN_FAILED' };
  }

  // return {
  //   status: 'ok',
  //   message: 'ok',
  // };
};

const signInWithDoctor = (email, password) => {
  // connection.query(FI)
};
