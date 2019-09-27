import express from "express";
import Promise from "bluebird";
import passport from "passport";
import * as userService from "./user.service";
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
      res.status(500).json(err);
    });
});

userRouter.post("/login", passport.authenticate("login"), (req, res) => {
  const userCredentials = req.body;
  return userService
    .loginUser(userCredentials)
    .then(result => {
      res.cookie("grubhubCookie", result.token, {
        maxAge: 900000,
        httpOnly: false
      });
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json(err);
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
      res.status(500).json(err);
    });
});
export default userRouter;
