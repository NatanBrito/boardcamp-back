import joi from "joi";
import db from '../db.js';
export async function validateData(req,res,next){
  const  schema= joi.object({
      name:joi.string().required()
  })
  const {error}= schema.validate(req.body);
  if(error){
    return res.sendStatus(400)
    }
    try{
        const categories= await db.query(`
         SELECT * FROM categories
         WHERE name=$1`,[req.body.name]);
         if(categories.rows.length > 0){
           res.sendStatus(409);
           return;
         }

     }catch(e){
         res.sendStatus(400)
     }

next()
}