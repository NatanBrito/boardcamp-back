import pg from 'pg';
// import dotenv from "dotenv"; lembrar de mudar
const {Pool}= pg;


const db = new Pool({
user,
password,
host,
port,
database
});
export default db;