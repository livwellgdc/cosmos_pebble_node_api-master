import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../config/db';

class ProductBrand extends Model {}
ProductBrand.init(
  {
    brandName: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    brandLogo: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    isViewMore: {
      type: DataTypes.TINYINT,
      defaultValue: false,
    },
    rank: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    colorCode: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  },
  {
    sequelize,
    tableName: 'pebble_product_brands',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

module.exports = {
  ProductBrand,
};
