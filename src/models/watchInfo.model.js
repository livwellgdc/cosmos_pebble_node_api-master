import { DataTypes, Sequelize, Model, Op } from 'sequelize';
import moment from 'moment';

import { sequelize } from '../config/db';

// Pebble: Init model,name
class WatchInfo extends Model {}
WatchInfo.init(
  {
    modelName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    modelNo: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    sdk: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    stepCount: {
      type: DataTypes.ENUM('Yes', 'No'),
      allowNull: false,
      defaultValue: 'No',
    },
    heartRate: {
      type: DataTypes.ENUM('Yes', 'No'),
      allowNull: false,
      defaultValue: 'No',
    },
    bloodOxygen: {
      type: DataTypes.ENUM('Yes', 'No'),
      allowNull: false,
      defaultValue: 'No',
    },
    bloodPressure: {
      type: DataTypes.ENUM('Yes', 'No'),
      allowNull: false,
      defaultValue: 'No',
    },
    Sleep: {
      type: DataTypes.ENUM('Yes', 'No'),
      allowNull: false,
      defaultValue: 'No',
    },
    temperature: {
      type: DataTypes.ENUM('Yes', 'No'),
      allowNull: false,
      defaultValue: 'No',
    },
    stressMonitor: {
      type: DataTypes.ENUM('Yes', 'No'),
      allowNull: false,
      defaultValue: 'No',
    },
    Resolution: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    Calling: {
      type: DataTypes.ENUM('Yes', 'No'),
      allowNull: false,
      defaultValue: 'No',
    },
    dialShape: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    }
  },
  {
    sequelize,
    tableName: 'pebble_watch_info',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

/**
 * get watch info
 * @author Toshendra Bohra
 * @returns array
 */
WatchInfo.getWatchInfo = async function (query) {
  let { modelName } = query;
  let where = { modelName: modelName };


  return await this.findOne({
    where,
    raw: true,
  });
};

module.exports = {
  WatchInfo,
};
