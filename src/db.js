import pg from 'pg';
import dotenv from "dotenv";
// .ENV  nao funcionando
// dotenv.config();
const {Pool}= pg;
const user='postgres';
const password='19951995';
const host='localhost';
const port=5432;
const database='boardcamp';

const db = new Pool({
user,
password,
host,
port,
database
});
export default db;