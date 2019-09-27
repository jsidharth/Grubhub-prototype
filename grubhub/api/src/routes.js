import express from 'express';
import userController from './api/modules/user/user.controller';
import restaurantController from './api/modules/restaurant/restaurant.controller';
import orderController from './api/modules/order/order.controller';
import itemController from './api/modules/item/item.controller';
import passport from 'passport';

const routes = express.Router();

routes.use('/user', userController);
routes.use('/restaurant', passport.authenticate("jwt"), restaurantController);
routes.use('/order', passport.authenticate("jwt"), orderController);
routes.use('/item', passport.authenticate("jwt"), itemController);
export default  routes;