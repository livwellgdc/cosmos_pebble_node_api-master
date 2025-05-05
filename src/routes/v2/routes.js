import { Router } from 'express';

import validate from '../../middlewares/validate';
import { getWatchFaces } from '../../validations/pebble.validation';
import { pebbleController } from '../../controllers';

const router = Router();

router.get('/watch-faces', validate(getWatchFaces), pebbleController.getWatchFaces);

module.exports = router;
