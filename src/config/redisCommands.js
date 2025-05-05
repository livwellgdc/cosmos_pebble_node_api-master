import client from  './redis'
import config from './config';

/**
 * set key value
 * @param {string} key
 * @param key options = {EX: t} t in sec
 */
const setCache = async(key, data, options = {}) =>{
    await client.set(key, data, options);
}

/**
 * get value
 * @param {string} key
 */
const getCache = async(key) =>{
    return await client.get(key);
}

/**
 * set hash value against a key
 * @param {string} key
 * @param {string} list e.g. "[field1, value1, field2, value2]"
 */
const setHashCache = async(key, list) =>{
    await client.hSet(key, list);
}

/**
 * get cached hash value
 * @param {string} key
 */
const getHashCache = async(key) =>{
    return await client.hGetAll(key);
}

/**
 * set expiry on key
 * @param {string} key
 * @param {number} t in sec
 */
const setExpiry = async(key, t = config.redis.expiryTime) =>{
    return await client.expire(key, t);
}

/**
 * check if key exists in redis store
 * @param {string} key
 */
const checkKeyExists = async(key)=>{
    return await client.exists(key)
}

/**
 * delete key from store
 * @param {string} key
 */
const deleteKey =async(key)=>{
    return await setExpiry(key, 0) // due to del permission setting expiry to 0
}

module.exports = {
    setCache,
    getCache,
    setHashCache,
    getHashCache,
    setExpiry,
    checkKeyExists,
    deleteKey
}