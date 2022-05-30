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
    const {customerId,gameId,daysRented}= req.body;
    console.log(dayjs().format('YYYY-MM-DD'));
    try{
        const {rows}= await db.query(`
        SELECT games."pricePerDay" 
        FROM games
        WHERE games.id=${gameId} ;
        `)
        const stock= await db.query(`
        SELECT games."stockTotal",games.id,rentals."gameId" 
        FROM games 
        JOIN rentals ON rentals."gameId"= games.id
        WHERE games.id=${gameId} ;
        `)
        // if(stock.rowCount >= stock.rows[0].stockTotal)
        // {
        //      return 
        // }
        const insertRental= db.query(`
        INSERT INTO rentals ("customerId","gameId","rentDate",
                "daysRented","returnDate","originalPrice","delayFee")
        VALUES ($1,$2,$3,$4,$5,$6,$7);
        `,[customerId,gameId,dayjs().format('YYYY-MM-DD'),daysRented,null,
        rows[0].pricePerDay*daysRented,null])
         res.sendStatus(201)
         return;
    }catch(e){
        res.sendStatus(400);
        return;
    }
}
