import joi from "joi";
import db from '../db.js';

export async function ValidateGame(req,res,next){
 const schema= joi.object({
     name: joi.string().min(1).max(40).required(),
     image: joi.string(),
     stockTotal: joi.number().greater(0).required(),
     categoryId: joi.number(),
     pricePerDay: joi.number().greater(0).required()
 })
 const {error}= schema.validate(req.body);
  if(error){
    return res.sendStatus(400)
    }
    try{
      const categories= await db.query(`
      SELECT categories.id 
      FROM categories 
      WHERE categories.id=${req.body.categoryId}; 
      `);
      if((categories.rows).length== 0){
          res.sendStatus(400);
          return;
      }
      const gamesName= await db.query(`
      SELECT games.name 
      FROM games 
      WHERE games.name='${req.body.name}'; 
      `);
      console.log(gamesName.rows)
      if((gamesName.rows).length !== 0){
          res.sendStatus(409);
          return;
        } 
   }catch(e){
       res.sendStatus(400)
       return;
      }      
next()
}