import {Router} from 'express';
import {getCustomers, postCustomer} from '../controllers/customersController.js';

const CustomersRouter= Router();

CustomersRouter.get('/customers', getCustomers);
CustomersRouter.get('/customers/:id', getCustomers);
CustomersRouter.post('/customers', postCustomer);
export default CustomersRouter
