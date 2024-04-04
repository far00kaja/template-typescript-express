import mongoose from 'mongoose';
import logger from './logger';
import dotenv from 'dotenv'
dotenv.config()
const mongoString: any = process.env.MONGODB_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error: Error) => {
    logger.info(error)
})

database.once('connected', () => {
    logger.info('Database Mongodb Connected');
})

module.exports = mongoose;