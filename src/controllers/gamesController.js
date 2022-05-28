import db from '../db.js';

export async function getGames(req,res){
    const name=req.query.name;
    

try{
    const Listgames= await db.query(`
    SELECT * FROM games
    `);
     const games= Listgames.rows
    if(name){
      const search=games.filter((game)=>{
      const sliceName= (game.name).slice(0,name.length)   
      if(sliceName.includes(name)){
          return game
      }
      })  
      res.send(search);
      return;
    }
     res.send(games).status(200);
    return;
    }catch(e){
        return res.sendStatus(400);
    }

}
export async function postGames(req,res){
     const {name,image,stockTotal,categoryId,pricePerDay}=req.body
    try{
     const insertGame= await db.query(`
    INSERT INTO games (name, "image", "stockTotal", "categoryId", "pricePerDay")
    VALUES ($1,$2,$3,$4,$5)
    `,[name,image,stockTotal,categoryId,pricePerDay]);
    res.sendStatus(201)
    }catch(e){
        res.sendStatus(400)
    }
}