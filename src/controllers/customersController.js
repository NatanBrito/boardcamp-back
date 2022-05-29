import db from '../db.js';

export async function getCustomers(req,res){
    const {id}= req.params;
    const customerId= parseInt(id);
    const {cpf}= req.query;
    try{
        if(id){
            const userId= await db.query(`
            SELECT *
            FROM customers
            WHERE id=${customerId}
            `);
            if((userId.rows).length){
                res.send(userId.rows); 
            } else{
                res.sendStatus(404)
            }
            return;
        }
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

export async function postCustomer(req,res){
    const {name,phone,cpf,birthday}= req.body
    try{
            const cpfValidate= await db.query(`
            SELECT customers.cpf 
            FROM customers
            WHERE customers.cpf= '${req.body.cpf}'
            ;
            `)
            if((cpfValidate.rows).length){
                res.sendStatus(409);
                return;
            }
        const insertCustomers= db.query(`
        INSERT INTO customers (name,phone,cpf,birthday)
        VALUES ($1,$2,$3,$4)
        `,[name,phone,cpf,birthday]);
        res.sendStatus(201)
    }catch(e){
        res.send(400)
    }
}
export async function putCustomer(req,res){
    const {id}= req.params;
    const customerId= parseInt(id);
    res.status(215).send(id);
    const updateCustomer=15;
    // {
    //     name: 'João Alfredo',
    //     phone: '21998899222',
    //     cpf: '01234567890',
    //     birthday: '1992-10-05'
    //   }
    return;
}
