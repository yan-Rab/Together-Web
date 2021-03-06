import express from 'express';

const routes = express.Router();

import Items from './controllers/ItemsController';
import Points from './controllers/PointsController';

import multer from 'multer';
import multerConfig from './config/multer';

const itemsController = new Items();
const pointsController = new Points();

import authMiddle from './middlewares/AuthMiddle';

routes.get('/items',itemsController.index)

routes.post('/point', multer(multerConfig).single('image')  ,pointsController.create);
routes.post('/auth', pointsController.authentication);
routes.get('/point/:id',pointsController.show);
routes.put('/dataPointPrimary/:id', multer(multerConfig).single('image'), pointsController.updateInforsPrimary );
routes.put('/dataPointSecundary', pointsController.updateInforsSecundary);
routes.put('/pointLocation', pointsController.updatePointLocation);
routes.put('/pointItems', pointsController.updatePointItems);
export default routes;