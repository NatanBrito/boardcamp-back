import {Router} from 'express';
import {postTeste} from '../controllers/categoriesController.js'

const categoriesRouter= Router();

categoriesRouter.post("/teste", postTeste);

export default categoriesRouter;