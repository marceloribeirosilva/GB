import { createPool } from 'mysql2';

const pool = createPool({
  host: process.env.HOST_AUTCOM,
  user: process.env.USER_AUTCOM,
  password: process.env.PASSWORD_AUTCOM,
  database: process.env.DATABASE_AUTCOM,
  waitForConnections: true,
  connectionLimit: 20,
  queueLimit: 0,
});

const promisePoolMySqlAutcom = pool.promise();
console.log('Conectou MySql2');

export default promisePoolMySqlAutcom;

/*
    const [rows] = await promisePoolMySql.query(
      'SELECT OPE_CODOPE, OPE_NOMOPE FROM CADOPE LIMIT 50',
    );
    console.log('rows', rows);
*/
