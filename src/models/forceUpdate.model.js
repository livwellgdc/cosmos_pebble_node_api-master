import { DataTypes, Sequelize, Model, Op } from 'sequelize';
import moment from 'moment';

import { sequelize } from '../config/db';

// Pebble: Init model,name
class ForceUpdate extends Model {}
ForceUpdate.init(
  {
    hard_update_version: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    soft_update_version: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    platform: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
    },
  },
  {
    sequelize,
    tableName: 'pebble_force_update',
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
ForceUpdate.getUpdate = async function (query) {
  let { platform } = query;
  let where = {};

  where.platform = platform;

  return await this.findAll({
    where,
    raw: true,
    order: [['id']],
  });
};

module.exports = {
  ForceUpdate,
};
