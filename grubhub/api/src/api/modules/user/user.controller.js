import express from "express";
import Promise from "bluebird";
import passport from "passport";
import {multerUploads, dataUri} from './../../../multer';
import * as userService from "./user.service";
import {cloudinaryConfig } from './../../../../config/cloudinaryConfig'
const userRouter = express.Router();

userRouter.post("/register", passport.authenticate("register"), (req, res) => {
  const userDetails = req.body;
  return userService
    .registerUser(userDetails)
    .then(result => {
      res.cookie("grubhubCookie", result.token, {
        maxAge: 900000,
        httpOnly: false
      });
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({
          message: err.message
      });
    });
});

userRouter.post("/login", passport.authenticate("login"), (req, res) => {
  const userCredentials = req.body;
  return userService
    .loginUser(userCredentials)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({
          message: err.message
      });
    });
});

userRouter.put("/update/:user_id", passport.authenticate("jwt"), (req, res) => {
  const userDetails = req.body;
  userDetails.user_id = req.params.user_id;
  return userService
    .updateUser(userDetails)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({
          message: err.message
      });
    });
});
//TODO: add jwt auth
userRouter.post("/upload/image", multerUploads, cloudinaryConfig, (req, res) => {
  let file;
  if(req.file) {
    file = dataUri(req).content;
  } else {
    res.status(400).json({
      message: 'No file Uploaded'
    });
  }
  userService.uploadImage(file).then(result => {
    res.status(200).json(result);
  }).catch(err => {
    res.status(500).json({
          message: err.message
      });
  });
});

userRouter.get("/get/:id", (req,res) => {
  userService.getUser(req.params.id).then(result => {
    res.status(200).json(result);
  }).catch(err => {
    res.status(500).json({
          message: err.message
      });
  });
});

export default userRouter;
