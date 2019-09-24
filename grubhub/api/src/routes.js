import express from 'express';
import userController from './api/modules/user/user.controller';
import restaurantController from './api/modules/restaurant/restaurant.controller';
import orderController from './api/modules/order/order.controller';
import itemController from './api/modules/item/item.controller';
const routes = express.Router();

routes.use('/user', userController);
routes.use('/restaurant', restaurantController);
routes.use('/order', orderController);
routes.use('/item', itemController);
export default  routes;