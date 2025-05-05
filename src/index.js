require("@babel/register");
require("@babel/polyfill");

const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger')
;

let server;
server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
});

if (config.NODE_ENV != 'production') {
    server.timeout = 240000;//4 minutes
}

//server exit operations
const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger.info('Server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

//unexpectedError handler
const unexpectedErrorHandler = (error) => {
    logger.error(error);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
process.on('SIGTERM', exitHandler);
