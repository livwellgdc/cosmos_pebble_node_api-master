import { Sequelize } from 'sequelize';
import _ from 'lodash';
import config from './config';

// db connection option
const sequelizeOptions = {
  host: config.databases.central.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  logging: config.env === 'production' ? false : console.log,
  dialectOptions: {
    dateStrings: true,
    typeCast: true,
  },
  logQueryParameters: true,
  timezone: '+05:30',
};

// create connection object
const sequelize = new Sequelize(
  config.databases.central.db,
  config.databases.central.user,
  config.databases.central.passwd,
  sequelizeOptions
);

// export connection object
module.exports = {
  sequelize,
};
