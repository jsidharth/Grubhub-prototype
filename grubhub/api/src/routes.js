import express from 'express';
import userController from './api/modules/user/user.controller';
import restaurantController from './api/modules/restaurant/restaurant.controller';
import orderController from './api/modules/order/order.controller';
const routes = express.Router();

routes.use('/user', userController);
routes.use('/restaurant', restaurantController);
routes.use('/order', orderController)
export default  routes;