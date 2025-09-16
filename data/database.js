import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
let database;

const initDb = (callback) => {
    if(database) {
        console.log("Database is already initialized");
        return callback(null, databse);
    }

    mongoose
        .connect(process.env.MONGO_URI)
        .then(()=> {
            console.log("Mongodb is succesfily connected");
            database = mongoose.connection.db;
            callback(null, database);
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




