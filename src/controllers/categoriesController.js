import db from '../db.js';


export async function getCategories (req,res){
    const all= await db.query('SELECT * FROM categories')
    let categories= all.rows;
    console.log(categories)
    return res.send(categories)
};
export async function postCategories(req,res){
  try{
    const insertCategories= await db.query(`
    INSERT INTO categories (name)
    VALUES($1)
    `,[req.body.name])
    res.sendStatus(201)
  }catch(e){
   res.sendStatus(400)
  }
};