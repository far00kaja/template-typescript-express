import dotenv from 'dotenv';
dotenv.config();
import { createClient } from 'redis'
const redisClient = createClient({
    url: process.env.REDIS_URL,

})

export default redisClient