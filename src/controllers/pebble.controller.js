import Response from '../utils/response';
import { pebbleService } from '../services';

// const httpStatus = require('http-status');
// const pick = require('../utils/pick');
// const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const commonDataProcessor = async (req, res, fn) => {
  try {
    let data = await fn();
    data = !data ? Response.notFound(data) : Response.success(data);
    res.status(data.code).send(data);
  } catch (err) {
    Response.exception(err.message);
  }
};

const getList = catchAsync(async (req, res) => {
  try {
    let data = await pebbleService.getList(req.query, req.body);
    data = !data ? Response.notFound(data) : Response.success(data);
    res.status(data.code).send(data);
  } catch (err) {
    Response.exception(err.message);
  }
});

const getWatchFaces = catchAsync(async (req, res) => {
  try {
    let data = req.originalUrl.includes('/v2/')
      ? await pebbleService.getPrioritizeWatchFaces(req.query, req.body)
      : await pebbleService.getWatchFaces(req.query, req.body);
    data = !data ? Response.notFound(data) : Response.success(data);
    res.status(data.code).send(data);
  } catch (err) {
    Response.exception(err.message);
  }
});

const getWatchInfo = catchAsync(async (req, res) => {
  try {
    let data = await pebbleService.getWatchInfo(req.query, req.body);
    data = !data ? Response.notFound(data) : Response.success(data);
    res.status(data.code).send(data);
  } catch (err) {
    Response.exception(err.message);
  }
});

const getFeed = catchAsync(async (req, res) => {
  try {
    let data = await pebbleService.getFeed(req.query, req.body);
    data = !data ? Response.notFound(data) : Response.success(data);
    res.status(data.code).send(data);
  } catch (err) {
    Response.exception(err.message);
  }
});

const getForceUpdate = catchAsync(async (req, res) => {
  try {
    let data = await pebbleService.getForceUpdate(req.query, req.body);
    data = !data ? Response.notFound(data) : Response.success(data);
    res.status(data.code).send(data);
  } catch (err) {
    Response.exception(err.message);
  }
});

const reportProblem = catchAsync(async (req, res) => {
  const userAgent = req.headers.platform;
  try {
    let data = await pebbleService.reportProblem(req.query, req.body, userAgent);
    data = !data ? Response.notFound(data) : Response.success(data);
    res.status(data.code).send(data);
  } catch (err) {
    Response.exception(err.message);
  }
});

const getBanners = catchAsync(async (req, res) => {
  try {
    let data = await pebbleService.getBanners(req.query, req.body);
    data = !data ? Response.notFound(data) : Response.success(data);
    res.status(data.code).send(data);
  } catch (err) {
    Response.exception(err.message);
  }
});

const getProducts = catchAsync(async (req, res) => {
  try {
    let data = await pebbleService.getProducts(req.query, req.body);
    data = !data ? Response.notFound(data) : Response.success(data);
    res.status(data.code).send(data);
  } catch (err) {
    Response.exception(err.message);
  }
});

const getStaticContent = catchAsync(async (req, res) => {
  try {
    let data = await pebbleService.getStaticContent(req.query);
    data = !data ? Response.notFound(data) : Response.success(data);
    res.status(data.code).send(data);
  } catch (err) {
    Response.exception(err.message);
  }
});

const productList = catchAsync(async (req, res) => {
  const dataFn = () => pebbleService.getProductList(req.query, res);
  commonDataProcessor(req, res, dataFn);
});

module.exports = {
  getList,
  getWatchFaces,
  getWatchInfo,
  getFeed,
  getForceUpdate,
  reportProblem,
  getBanners,
  getProducts,
  getStaticContent,
  productList,
};
