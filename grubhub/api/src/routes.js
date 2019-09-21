import express from 'express';
import userController from './api/modules/user/user.controller';
import restaurantController from './api/modules/restaurant/restaurant.controller';
const routes = express.Router();

routes.use('/user', userController);
routes.use('/restaurant', restaurantController);

export default  routes;