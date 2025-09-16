import express from 'express';
import { initDb as databaseInit } from "./data/database.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import surveyRoutes from "./routes/route.js";


const app = express();
const port = process.env.PORT || 2700;


dotenv.config();

app.use(cors());
app.use(express.json());


app.use('/survey', surveyRoutes);


databaseInit((err) => {
    if(err) {
        console.log(err)
    } else {
        app.listen(port, () => {
        console.log(`Database is listening and Node Running in port ${port}`);
        });
    }
});

