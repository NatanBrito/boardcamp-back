import db from '../db.js';


export async function postTeste (req,res){
    const testedb= db.query('SELECT * FROM teste_categories')
    testedb.then((results)=>{
     return res.status(201).send(results.rows)
    });
    testedb.catch((e)=>{
      return  res.status(500)
    })
};