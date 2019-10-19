import express from "express";
import passport from "passport";
import * as restaurantService from "./restaurant.service";
import {multerUploads, dataUri} from './../../../multer';
import {cloudinaryConfig } from './../../../../config/cloudinaryConfig'
const restaurantRouter = express.Router();

restaurantRouter.get("/:restaurant_id", (req, res) => {
  const restaurant_id = req.params.restaurant_id;
  restaurantService
    .getRestaurant(restaurant_id)
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

restaurantRouter.post("/upload/image/restaurant/:restaurant_id", multerUploads, cloudinaryConfig, (req, res) => {
  let file;
  if(req.file) {
    file = dataUri(req).content;
  } else {
    res.status(400).json({
      message: 'No file Uploaded'
    });
  }
  restaurantService.uploadImage({
    file,
    restaurant_id: req.params.restaurant_id
  }).then(result => {
    res.status(200).json(result);
  }).catch(err => {
    res.status(500).json({
          message: err.message
      });
  });
});

export default restaurantRouter;
