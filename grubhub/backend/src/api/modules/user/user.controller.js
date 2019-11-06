import express from "express";
import passport from "passport";
import { multerUploads, dataUri } from "./../../../multer";
import { cloudinaryConfig, uploader} from "./../../../../config/cloudinaryConfig";
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

userRouter.put("/update/:user_id", passport.authenticate('jwt'), (req, res) => {
  const userDetails = req.body;
  userDetails.user_id = req.params.user_id;
  kafka.make_request("user.detail.update", userDetails, (err, results) => {
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
  passport.authenticate('jwt'),
  (req, res) => {
    let file;
    if (req.file) {
      file = dataUri(req).content;
    } else {
      res.status(400).json({
        message: "No file Uploaded"
      });
    }
    return uploader
    .upload(file, {
      transformation: [{ width: 150, height: 100, crop: "scale" }]
    }).then(result => {
      const image = result.url;
      const imageDetails = {
        url: image,
        user_id: req.params.user_id,
        type: 'User'
      };
      kafka.make_request("image.upload", imageDetails, (err, results) => {
        if (err) {
          res.status(500).json({
            message: err.message
          });
        }
        res.status(200).json(results);
      });
    });
  }
);

userRouter.get("/getdetails/:id", passport.authenticate('jwt'), (req, res) => {
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
