import pg from 'pg';
import dotenv from "dotenv";
dotenv.config();
const {Pool}= pg;


{
    rejectUnauthorized: false
}
const db = new Pool({
    connectionString: process.env.DATABASE_URL,
});
export default db;