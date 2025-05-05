import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../config/db';
import { ifShowData } from '../utils/commonUtils';

// Pebble: Init model,name
class Banner extends Model { }
Banner.init(
    {
        bannerImage: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
        },
        link: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
        },
        is_link_internal: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0,
        },
        page: {
            type: DataTypes.ENUM("HOME", "PRODUCT"),
            allowNull: false,
            defaultValue: '',
        },
        isActive: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        sequelize,
        tableName: 'pebble_banners',
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

Banner.getBanners = async function (query) {
    let { page, phoneNumber } = query;

    if (!ifShowData(phoneNumber, 1)) return [];

    const where = { page: page.toUpperCase() };
    return this.findAll({ where });
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
    Banner,
};
