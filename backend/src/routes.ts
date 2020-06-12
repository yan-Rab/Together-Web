import express from 'express';

const routes = express.Router();

import Items from './controllers/ItemsController';
import Points from './controllers/PointsController';

import multer from 'multer';
import multerConfig from './config/multer';

const itemsController = new Items();
const pointsController = new Points();

routes.get('/items', multer(multerConfig).single('image') ,itemsController.index)

routes.post('/point', pointsController.create);

export default routes;