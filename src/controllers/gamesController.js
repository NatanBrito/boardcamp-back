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
         
      if((game.name).includes(name)){
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
    res.sendStatus(201);
}