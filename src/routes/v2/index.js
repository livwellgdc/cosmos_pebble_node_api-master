import { Router } from 'express';
import routes from './routes';

const router = Router();

const ROUTES = [
    {
        path: '/content',
        route: routes,
    },
];

ROUTES.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
