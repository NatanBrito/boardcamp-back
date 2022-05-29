import joi from "joi";
import DateExtension from '@joi/date';
import db from '../db.js';
import { isContext } from "vm";
const Joi= joi.extend(DateExtension);
export async function validateCustomers(req,res,next){
  const   schemaCustomers= joi.object({
      name: joi.string().min(1).max(80).required(),
      phone: joi.string().min(10).max(11).required(),
      cpf: joi.string().min(11).max(11).required(),
      birthday: Joi.date().format('YYYY-MM-DD').required()
    })
    const {error}= schemaCustomers.validate(req.body);
    if (error) {
        const xx=error.details.forEach((object) =>{
            if(object.context.label === 'birthday'){
                 res.sendStatus(400);
                }
                return object.message;
        });
        return res.status(406).send(xx);
      }
     
    next();
}