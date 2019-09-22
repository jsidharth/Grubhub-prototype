import express from "express";
import passport from "passport";
import * as restaurantService from "./restaurant.service";
const restaurantRouter = express.Router();

restaurantRouter.get("/:user_id", (req, res) => {
  const user_id = req.params.user_id;
  restaurantService
    .getRestaurant(user_id)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
export default restaurantRouter;
