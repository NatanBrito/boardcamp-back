import db from '../db.js';
import dayjs from 'dayjs';
export async function getRentals(req,res){
    let listRentals;
    let listCustomer;
    let listCustomerId;
    let listGames;
    const {customerId, gameId}=req.query;
    let customer= parseInt(customerId);
    let idGame= parseInt(gameId)
    try{ 
        if(idGame){
            console.log(customer+"eu entrei")
            listGames= await db.query(`
            SELECT rentals."gameId" FROM rentals
            WHERE rentals."customerId"=${idGame}
            `);
           }
        
        if(customer){
            console.log(customer+"eu entrei")
            listCustomerId= await db.query(`
            SELECT rentals."customerId" FROM rentals
            WHERE rentals."customerId"=${customer}
            `);
           }
        listRentals= await db.query(`
    SELECT rentals.*, categories.name as "categoria" , customers.id as "userId",
    customers.name as "nomeUser", games.id as "jogoID",
    games.name as "nomeJogo", games."categoryId" as "categoriaId"
    FROM rentals 
    JOIN customers ON customers.id= rentals."customerId"
    JOIN games  ON games.id=rentals."gameId"
    JOIN categories ON categories.id= games."categoryId" ;
    `) 
    
    const objUser=(listRentals.rows).map((user)=>{
        let SliceDate=(user.rentDate).toISOString().slice(0,10);
        return {
        
            id: user.id,
            customerId: user.customerId,
            gameId: user.gameId,
            rentDate: SliceDate,
            daysRented: user.daysRented,
            returnDate: user.returnDate, 
            originalPrice:user.originalPrice,
            delayFee: user.delayFee,
            customer:{
             id: user.userId,
             name: user.nomeUser
            },
            game:{
                id: user.jogoID ,
                name: user.nomeJogo ,
                categoryId: user.categoriaId ,
                categoryName: user.categoria
            }
        }
        
    })
       if(customer){
          let listID=objUser.filter((user)=>{
            if(user.customerId === customer){
                return user
            } 
           })
           if(listID.length) return res.send(listID)
           res.send(listID);
           return;
       }
       if(idGame){
        let listID=objUser.filter((user)=>{
            if(user.gameId === idGame){
                return user
            } 
           })
           if(listID.length) return res.send(listID)
           res.send(listID);
           return; 
       }

    res.send(objUser);
    return;
  }catch(e){
      res.sendStatus(400);
  }
}
export async function postRentals(req,res){
    console.log(dayjs().format('YYYY-MM-DD'));
    res.sendStatus(201)
}