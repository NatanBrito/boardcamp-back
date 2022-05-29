import {Router} from 'express';
import {getCustomers, postCustomer, putCustomer} from '../controllers/customersController.js';
import {validateCustomers} from '../middlewares/schemaCustomersMiddleware.js'
const CustomersRouter= Router();

CustomersRouter.get('/customers', getCustomers);
CustomersRouter.get('/customers/:id', getCustomers);
CustomersRouter.post('/customers', validateCustomers, postCustomer);
CustomersRouter.put('/customers/:id', validateCustomers, putCustomer);

export default CustomersRouter
