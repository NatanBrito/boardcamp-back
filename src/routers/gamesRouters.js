import {Router} from 'express';
import {getGames, postGames} from '../controllers/gamesController.js';
import {ValidateGame} from '../middlewares/schemaGamesMiddleware.js'
const gamesRouter= Router();

gamesRouter.get('/games',getGames);
gamesRouter.post('/games',ValidateGame,postGames)


export default gamesRouter