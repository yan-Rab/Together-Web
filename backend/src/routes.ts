import express from 'express';

const routes = express.Router();

import Items from './controllers/ItemsController';
import Points from './controllers/PointsController';

const itemsController = new Items();
const pointsController = new Points();

routes.get('/items', itemsController.index)

routes.post('/point', pointsController.create);

export default routes;