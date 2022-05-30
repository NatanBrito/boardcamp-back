import {Router} from 'express';
import { getRentals, postRentals } from '../controllers/rentalsController.js';
import {ValidateRental} from '../middlewares/schemaRentalMiddleware.js';
const rentalsRouter= Router();

rentalsRouter.get('/rentals', getRentals);
rentalsRouter.post('/rentals', ValidateRental, postRentals);





export default rentalsRouter;
