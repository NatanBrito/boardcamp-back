import joi from "joi";
import db from "../db.js";

export async function ValidateRental(req,res,next){
 const schema= joi.object({
    customerId: joi.number().required(),
    gameId:joi.number().required(),
    daysRented: joi.number().greater(0).required()
 })
  const {error}= schema.validate(req.body)
    if(error){
        return res.sendStatus(400)
        }
        try{
            let  search= await db.query(`
            SELECT customers.id,games.id  FROM customers
            JOIN games ON games.id=${req.body.gameId}
            WHERE customers.id=${req.body.customerId};
            `);
            if((search.rows).length === 0){
                res.sendStatus(400)
                return;   
            }
    }catch(e){
        res.sendStatus(400);
    }

    next();
}