import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../config/db';

// Pebble: Init model,name
class WatchFacesCategory extends Model { }
WatchFacesCategory.init(
    {
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
        }
    },
    {
        sequelize,
        tableName: 'pebble_watch_faces_category',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

module.exports = {
    WatchFacesCategory,
};
