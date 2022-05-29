import express from "express";
import cors from 'cors';
import chalk from "chalk";
import categoriesRouter from './routers/categoriesRouter.js';
import gamesRouter from "./routers/gamesRouters.js";
import CustomersRouter from "./routers/customersRouter.js";
import rentalsRouter from "./routers/rentalsRouter.js";
const app= express();
app.use(cors());
app.use(express.json());

app.use(categoriesRouter);
app.use(gamesRouter);
app.use(CustomersRouter);
app.use(rentalsRouter);
app.listen(5000,()=>{ console.log(chalk.bold.blue("Silencio, estamos no AR !!!!"))})