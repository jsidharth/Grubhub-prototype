import express from "express";
import passport from "passport";
import { multerUploads, dataUri } from "./../../../multer";
import * as userService from "./user.service";
import { cloudinaryConfig } from "./../../../../config/cloudinaryConfig";
import kafka from "../../../../kafka/client";

const userRouter = express.Router();

userRouter.post("/register", passport.authenticate("register"), (req, res) => {
  const userDetails = req.body;
  kafka.make_request("user.register", userDetails, (err, results) => {
    if (err) {
      res.status(500).json({
        message: err.message
      });
    }
    res.status(200).json(results);
  });
});

userRouter.post("/login", passport.authenticate("login"), (req, res) => {
  const userCredentials = req.body;
  kafka.make_request("user.login", userCredentials, (err, results) => {
    if (err) {
      res.status(500).json({
        message: err.message
      });
    }
    res.status(200).json(results);
  });
});

userRouter.put("/update/:user_id", (req, res) => {
  const userDetails = req.body;
  userDetails.user_id = req.params.user_id;
  kafka.make_request("user.details.update", userDetails, (err, results) => {
    if (err) {
      res.status(500).json({
        message: err.message
      });
    }
    res.status(200).json(results);
  });
});

//TODO: add jwt auth
userRouter.post(
  "/upload/image/profile/:user_id",
  multerUploads,
  cloudinaryConfig,
  (req, res) => {
    let file;
    if (req.file) {
      file = dataUri(req).content;
    } else {
      res.status(400).json({
        message: "No file Uploaded"
      });
    }
    userService
      .uploadImage({
        file,
        user_id: req.params.user_id
      })
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        });
      });
  }
);

userRouter.get("/getdetails/:id", (req, res) => {
  kafka.make_request("user.details", req.params.id, (err, results) => {
    if (err) {
      res.status(500).json({
        message: err.message
      });
    }
    res.status(200).json(results);
  });
});

export default userRouter;
