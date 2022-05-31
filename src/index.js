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
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(chalk.bold.green("Silencio, estamos no AR!!!"));
});