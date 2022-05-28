import db from '../db.js';

export async function getCustomers(req,res){
    const {cpf}= req.query;
    console.log(cpf)
    try{
        const listCustomers= await db.query(`
        SELECT * 
        FROM  customers
        `)
        const teste= (listCustomers.rows).map((cust)=>{
            let Slicebirth=(cust.birthday).toISOString().slice(0,10);
            return {...cust,birthday:Slicebirth}
        })
        if(cpf){
            const search=teste.filter((customer)=>{
                const sliceCpf= (customer.cpf).slice(0,cpf.length)   
                if(sliceCpf.includes(cpf)){
                
                    return customer
                }
            })
            res.send(search)
            return;
        }
        
        res.status(200).send(teste)
    }catch(e){
        res.sendStatus(400);
        return;
    }
}