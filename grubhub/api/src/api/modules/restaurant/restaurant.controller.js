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
      res.status(500).json({
        message: err.message
    });
    });
});

restaurantRouter.get('/menu/:restaurant_id', (req, res) => {
  const restaurant_id = req.params.restaurant_id;
  restaurantService.getRestaurantMenu(restaurant_id).then(result => {
      res.status(200).json(result);
  }).catch(err => {
      res.status(500).json({
          message: err.message
      });
  })
});

restaurantRouter.get('/detail/:restaurant_id', (req, res) => {
  const restaurant_id = req.params.restaurant_id;
  restaurantService.getRestaurantDetails(restaurant_id).then(result => {
    res.status(200).json(result);
  }).catch(err => {
    res.status(500).json({
      message: err.message
    });
  });
});

restaurantRouter.put('/menu/section', (req, res) => {
  const section = req.body;
  restaurantService.updateSection(section).then(result => {
    res.status(200).json(result);
  }).catch(err => {
    res.status(500).json({
      message: err.message
    });
  });
});

restaurantRouter.put('/menu/section/delete', (req, res) => {
  const section = req.body;
  restaurantService.deleteSection(section).then(result => {
    res.status(200).json(result);
  }).catch(err => {
    res.status(500).json({
      message: err.message
    });
  });
});

export default restaurantRouter;
