import express from "express";
import cors from 'cors';
import chalk from "chalk";
import categoriesRouter from './routers/categoriesRouter.js';

const app= express();
app.use(cors());
app.use(express.json());

app.use(categoriesRouter);

app.listen(5000,()=>{ console.log(chalk.bold.blue("Silencio, estamos no AR !!!!"))})