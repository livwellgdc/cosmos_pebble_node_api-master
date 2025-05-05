import { DataTypes, Sequelize, Model, Op } from 'sequelize';
import moment from 'moment';

import { sequelize } from '../config/db';

// Pebble: Init model,name
class Problems extends Model {}
Problems.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    WatchName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    CustomerName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    Phone: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    Issue: {
      type: DataTypes.TEXT('long'),
      defaultValue: '',
    },
    Device: {
      type: DataTypes.ENUM('Android', 'iOS', 'Unknown'),
      allowNull: false,
      defaultValue: 'No',
    },
  },
  {
    sequelize,
    tableName: 'pebble_watch_problems',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

const getDevice = (userAgent) => {
  if (userAgent == 0) return 'Android';
  return 'iOS';
  // return 'Unknown';
};

/**
 * save watch problems
 * @author Toshendra Bohra
 * @returns array
 */
Problems.report = async function (query, body, userAgent) {
  const device = getDevice(userAgent);
  return await this.create(
    Object.assign(
      {
        Device: device,
      },
      body
    )
  );
};

module.exports = {
  Problems,
};
