import config from './config'
import mongoose from 'mongoose'
import logger from './logger'

//connecting to mongodb 
mongoose.connect(config.databases.logDB.url, config.databases.logDB.options).then(() => {
    logger.info('Connected to MongoDB');
}).catch(error => {
    logger.error("logdb connection error ", error)
})

module.exports = {
    mongoose
}