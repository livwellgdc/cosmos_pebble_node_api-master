const Joi = require('joi');
// const { password, objectId } = require('./custom.validation');

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getList = {
  query: Joi.object().keys({
    business_id: Joi.string(),
  }),
};

const getFeed = {
  query: Joi.object().keys({
    page: Joi.number(),
    is_ampstory: Joi.number(),
    nocache: Joi.number(),
    is_video: Joi.number(),
    category: Joi.string(),
  }),
};

const getWatchFaces = {
  query: Joi.object().keys({
    sdkType: Joi.string().required(),
    resolution: Joi.string().required(),
    firmware: Joi.string(),
    chipset: Joi.string(),
  }),
};

const getWatchInfo = {
  query: Joi.object().keys({
    modelName: Joi.string().required(),
  }),
};

const getForceUpdate = {
  query: Joi.object().keys({
    platform: Joi.string().required().valid('ios', 'android'),
  }),
};

const reportProblem = {};

const banners = {
  query: Joi.object().keys({
    phoneNumber: Joi.number().required(),
    page: Joi.string().required().valid('home', 'product'),
  }),
};

const products = {};

const getStaticContent = {
  query: Joi.object().keys({
    type: Joi.string().optional().valid('faq', 'tnc'),
    page: Joi.string().required().valid('home', 'product'),
  }),
};

const productList = {
  query: Joi.object().keys({
    brandName: Joi.string().optional(),
  }),
};

module.exports = {
  getUsers,
  getList,
  getFeed,
  getWatchFaces,
  getWatchInfo,
  getForceUpdate,
  reportProblem,
  banners,
  products,
  getStaticContent,
  productList,
};
