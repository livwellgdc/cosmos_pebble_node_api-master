const express = require('express');
const validate = require('../../middlewares/validate');
const pebbleValidation = require('../../validations/pebble.validation');
const pebbleController = require('../../controllers/pebble.controller');
// const auth = require('../../middlewares/auth');

const router = express.Router();

// health check api
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

router.get('/list', validate(pebbleValidation.getList), pebbleController.getList);
router.get('/feed', validate(pebbleValidation.getFeed), pebbleController.getFeed);
router.get('/watch-info', validate(pebbleValidation.getWatchInfo), pebbleController.getWatchInfo);
router.get('/watch-faces', validate(pebbleValidation.getWatchFaces), pebbleController.getWatchFaces);
router.get('/update', validate(pebbleValidation.getForceUpdate), pebbleController.getForceUpdate);
router.post('/report-problem', validate(pebbleValidation.reportProblem), pebbleController.reportProblem);

router.get('/banners', validate(pebbleValidation.banners), pebbleController.getBanners);
router.get('/products', validate(pebbleValidation.products), pebbleController.getProducts);
router.get('/static', validate(pebbleValidation.getStaticContent), pebbleController.getStaticContent);
router.get('/productlist', validate(pebbleValidation.productList), pebbleController.productList);

module.exports = router;
