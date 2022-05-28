import {Router} from 'express';
import {getCategories,postCategories} from '../controllers/categoriesController.js';
import {validateData} from '../middlewares/schemaCategoriesMiddlewares.js';
import {getGames} from '../controllers/gamesController.js';
const categoriesRouter= Router();

categoriesRouter.get("/categories", getCategories);
categoriesRouter.post("/categories",validateData, postCategories);

export default categoriesRouter;