import { DataTypes, Sequelize, Model, Op } from 'sequelize';
import moment from 'moment';

import { sequelize } from '../config/db';

// Pebble: Init model,name
class Pebble extends Model {}
Pebble.init(
  {
    business_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    fb_ad_id: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    campaign_id: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    adset_id: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    insights: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    adcreatives: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    is_processed: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 1,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    updated_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: 'ad_ads',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

/**
 * Pebble List
 * @author Kushagra Tiwari <kushagra.tiwari@timesinternet.in>>
 * @returns array
 */
Pebble.getList = async function (query) {
  let { limit = 10, page = 1, order = 'desc', orderBy = 'created_at', keyword, business_id, status } = query;

  let where = {};

  // if (keyword) {
  //   where = {
  //     [Op.or]: [
  //       { '$Client.name$': { [Op.like]: `%${keyword}%` } },
  //       { contact_email: { [Op.like]: `%${keyword}%` } },
  //       { contact_name: { [Op.like]: `%${keyword}%` } },
  //       { contact_mobile: { [Op.like]: `%${keyword}%` } },
  //       { client_name: { [Op.like]: `%${keyword}%` } },
  //       { title: { [Op.like]: `%${keyword}%` } },
  //       { agency_name: { [Op.like]: `%${keyword}%` } },
  //     ]
  //   }
  // }

  if (status) {
    where.status = status;
  }

  if (business_id) {
    where.business_id = business_id;
  }

  limit = parseInt(limit);
  page = parseInt(page);

  return await this.findAndCountAll({
    attributes: ['id', 'business_id', 'fb_ad_id', 'adset_id', 'name', 'insights', 'adcreatives', 'is_processed'],
    where,
    order: [[orderBy, order]],
    limit: limit,
    offset: (page - 1) * limit,
    raw: true,
  });
};

module.exports = {
  Pebble,
};
