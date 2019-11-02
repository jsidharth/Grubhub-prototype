import express from "express";
import passport from "passport";
import * as restaurantService from "./restaurant.service";
import {multerUploads, dataUri} from './../../../multer';
import {cloudinaryConfig } from './../../../../config/cloudinaryConfig'
import kafka from "../../../../kafka/client";

const restaurantRouter = express.Router();

restaurantRouter.get("/:restaurant_id", (req, res) => {
  const restaurant_id = req.params.restaurant_id;
  kafka.make_request("restaurant.details", restaurant_id, (err, results) => {
    if (err) {
      res.status(500).json({
        message: err.message
      });
    }
    res.status(200).json(results);
  });
});

restaurantRouter.get('/menu/:restaurant_id', (req, res) => {
  const restaurant_id = req.params.restaurant_id;
  kafka.make_request("restaurant.menu", restaurant_id, (err, results) => {
    if (err) {
      res.status(500).json({
        message: err.message
      });
    }
    res.status(200).json(results);
  });
});

restaurantRouter.get('/detail/:restaurant_id', (req, res) => {
  const restaurant_id = req.params.restaurant_id;
  kafka.make_request("restaurant.getdetails", restaurant_id, (err, results) => {
    if (err) {
      res.status(500).json({
        message: err.message
      });
    }
    res.status(200).json(results);
  });
});

restaurantRouter.put('/menu/section', (req, res) => {
  const section = req.body;
  kafka.make_request("update.section", section, (err, results) => {
    if (err) {
      res.status(500).json({
        message: err.message
      });
    }
    res.status(200).json(results);
  });
});

restaurantRouter.put('/menu/section/delete', (req, res) => {
  const section = req.body;
  kafka.make_request("delete.section", section, (err, results) => {
    if (err) {
      res.status(500).json({
        message: err.message
      });
    }
    res.status(200).json(results);
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
