import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../config/db';

// Pebble: Init model,name
class WatchFaces extends Model { }
WatchFaces.init(
  {
    _id: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    rank: {
      type: DataTypes.INTEGER,
    },
    sdkType: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    resolution: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    category: {
      type: DataTypes.ENUM('Yes', 'No'),
      allowNull: false,
      defaultValue: 'No',
    },
    binFile: {
      type: DataTypes.ENUM('Yes', 'No'),
      allowNull: false,
      defaultValue: 'No',
    },
    image: {
      type: DataTypes.ENUM('Yes', 'No'),
      allowNull: false,
      defaultValue: 'No',
    },
    firmware: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
  },
  {
    sequelize,
    tableName: 'pebble_watch_faces',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

/**
 * get watch info
 * @author Mohan Gupta
 * @returns array
 */
WatchFaces.filterWatchFaces = async function (query) {
  let { sdkType, resolution, firmware, chipset } = query;
  let where = { sdkType: sdkType, resolution: resolution };
  if (chipset) where.chipset = chipset;

  if (firmware) where.firmware = firmware;

  return await this.findAll({
    where,
    raw: true,
    order: [['id']],
  });
};

module.exports = {
  WatchFaces,
};
