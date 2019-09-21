import express from 'express';
import passport from 'passport';
import * as restaurantService from './restaurant.service';
const restaurantRouter = express.Router();

restaurantRouter.get('/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    restaurantService.getRestaurant(user_id).then(result => {
        return res.status(200).json(result);
    }).catch(err => {
        return res.status('500').json(err)
    })
})
export default restaurantRouter;