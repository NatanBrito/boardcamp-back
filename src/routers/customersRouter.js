import {Router} from 'express';
import {getCustomers} from '../controllers/customersController.js';

const CustomersRouter= Router();

CustomersRouter.get('/customers', getCustomers);

export default CustomersRouter
