import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../config/db';


class StaticContent extends Model { }
StaticContent.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: '',
        },
        type: {
            type: DataTypes.ENUM('HOME', 'PRODUCT'),
            allowNull: false,
            defaultValue: '',
        },
        page: {
            type: DataTypes.NUMBER,
            allowNull: false,
            defaultValue: '',
        },
        isActive: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: '',
        },
    },
    {
        sequelize,
        tableName: 'pebble_static_content',
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

StaticContent.getStaticContent = async function (query) {
    const { type, page } = query;
    let where = {
        page: page.toUpperCase(),
    }
    if (type) {
        where['type'] = type;
    }
    return this.findAll({ where });
};

module.exports = {
    StaticContent,
};
