import {Router} from 'express';
import { getRentals, postRentals,postIdRentals, deleteRentals } from '../controllers/rentalsController.js';
import {ValidateRental} from '../middlewares/schemaRentalMiddleware.js';
const rentalsRouter= Router();

rentalsRouter.get('/rentals', getRentals);
rentalsRouter.post('/rentals', ValidateRental, postRentals);
rentalsRouter.post('/rentals/:id/return', postIdRentals);
rentalsRouter.delete('/rentals/:id', deleteRentals);





export default rentalsRouter;
