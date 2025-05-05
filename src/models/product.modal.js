import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../config/db';

class Product extends Model { }
Product.init(
    {
        productImage: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
        },
        productName: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
        },
        Mrp: {
            type: DataTypes.NUMBER,
            allowNull: false,
            defaultValue: '',
        },
        sellingPrice: {
            type: DataTypes.NUMBER,
            allowNull: false,
            defaultValue: '',
        },
        link: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
        },
        couponCode: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
        },
        is_link_internal: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0,
        },
        isActive: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0,
        },
        isOOS: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0,
        },
        isTopPick: {
            type: DataTypes.TINYINT,
            defaultValue: 0,
        },
        rank: {
            type: DataTypes.INTEGER,
        },
        isHighlight: {
            type: DataTypes.TINYINT,
        },
        brandName: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        categoryName: {
            type: DataTypes.STRING,
        }
    },
    {
        sequelize,
        tableName: 'pebble_products',
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

Product.getProducts = async function () {
    return this.findAll({
        where: { isOOS: 0, isTopPick: 1 },
        order: ['rank'],
        attributes: {
            exclude: ['created_at', 'updated_at'],
        },
    });
};
// Banner.filterWatchFaces = async function (query) {
//   let { sdkType, resolution, firmware } = query;
//   let where = { sdkType: sdkType, resolution: resolution };

//   if (firmware) where.firmware = firmware;

//   return await this.findAll({
//     where,
//     raw: true,
//     order: [['id']],
//   });
// };

module.exports = {
    Product,
};
