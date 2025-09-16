import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { dot } from 'node:test/reporters';
import { callbackify } from 'node:util';

dotenv.config();
let database;

const initDb = (callback) => {
    if(databse) {
        console.log("Database is already initialized");
        return callback(null, databse);
    }

    mongoose
        .connect(process.env.MONGO_URI)
        .then(()=> {
            console.log("Mongodb is succesfily connected");
            databse = mongoose.connection.db;
            callback(null, databse);
        })
        .catch((err) => {
            console.error('Mongoose connection error: ', err);
            callback(err);
        });
};

const getDatabase = () => {
    if(!database) {
        throw Error('Database not initialized');
    }
    return database;
};

export { initDb, getDatabase };




