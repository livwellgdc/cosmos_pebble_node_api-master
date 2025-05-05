import { createClient } from 'redis';
import config from './config';

const client = createClient({
    url: config.redis.url,
    database: config.redis.db,
    password: config.redis.password
});

client.connect();

client.on('connect', () => {
    console.log("redis connected")
    process.env.REDIS_CONNECTION = "ON"
});

client.on('error', (err) =>{
    // console.log('Redis Client Error')
    process.env.REDIS_CONNECTION = "OFF"
});

client.on('close', () => console.log('Redis close'));

module.exports = client