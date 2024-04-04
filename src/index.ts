// src/index.ts
import express from 'express';
import redis from './config/redis'
import './config/mongoose'
import './config/sequelize'

const app = express();

redis.connect();

redis.on("error", (error: Error) => {
  console.error(`Redis client error:`, error);
});



export default app; 