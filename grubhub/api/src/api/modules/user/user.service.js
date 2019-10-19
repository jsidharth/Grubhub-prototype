import _ from "lodash";
import User from "./user.model";
import Restaurant from "./../restaurant/restaurant.model";
import * as restaurantService from "../restaurant/restaurant.service";
import jwtSecret from "../../../../config/jwtConfig";
import jwt from "jsonwebtoken";
import { uploader } from "./../../../../config/cloudinaryConfig";

const registerUser = userDetails => {
  return User.findOne({
    email: userDetails.email
  }).then(user => {
    if (!user) {
      throw new Error("User registration failed");
    }
    // Update User table with registration details
    user.first_name = userDetails.first_name;
    user.last_name = userDetails.last_name;
    user.type = userDetails.type;
    var restaurantPromise =
      userDetails.type === "Owner" ? Restaurant.create({}) : Promise.resolve();
    return restaurantPromise.then(restaurant => {
      if (restaurant) {
        user.restaurant = restaurant.id;
      }
      return user.save().then(updatedUser => {
        const token = jwt.sign({ id: updatedUser.id }, jwtSecret.secret);
        const { id, first_name, last_name, email, type } = updatedUser;
        return {
          id,
          first_name,
          last_name,
          email,
          type,
          token,
          restaurant
        };
      });
    });
  });
};

const loginUser = userCredentials => {
  return User.findOne({
    email: userCredentials.email
  }).then(user => {
    if (!user) {
      return new Error("User Login failed!");
    }
    const token = jwt.sign({ id: user.id }, jwtSecret.secret);
    const {
      id,
      first_name,
      last_name,
      email,
      type,
      phone,
      address,
      image
    } = user;
    console.log(user);
    const restaurant = user.restaurant || '';
    return {
      id,
      first_name,
      last_name,
      email,
      type,
      phone,
      address,
      image,
      token,
      restaurant
    };
  });
};

const updateUser = userDetails => {
  return User.findById(userDetails.user_id).then(user => {
    if (!user) {
      throw new Error("User not found");
    }
    const { first_name, last_name, phone, address } = userDetails;
    user.first_name = first_name;
    user.last_name = last_name;
    user.phone = phone;
    user.address = address;
    return user
      .save()
      .then(updatedUser => {
        if (updatedUser.type === "Owner") {
          const restaurantDetails = {
            id: userDetails.restaurant_id || "",
            restaurant_name: userDetails.restaurant_name,
            cuisine: userDetails.cuisine,
            restaurant_image: userDetails.restaurant_image,
            address: userDetails.restaurant_address,
            zipcode: userDetails.restaurant_zipcode,
            user_id: userDetails.user_id
          };
          return restaurantService
              .updateDetails(restaurantDetails)
              .then(restaurant => {
                return {
                  user: updatedUser,
                  restaurant
                };
              });
        } else {
          return {
            user: updatedUser
          };
        }
      });
  });
};

const uploadImage = payload => {
  return uploader
    .upload(payload.file, {
      transformation: [{ width: 150, height: 100, crop: "scale" }]
    })
    .then(result => {
      const image = result.url;
      return User.findById(
        payload.user_id
      ).then(user => {
        if (!user) {
          throw new Error("User not found!");
        }
        user.image = image;
        return user
          .save()
          .then(() => ({
            image
          }));
      });
    }).catch(err => ({
      messge: "someting went wrong while uploading image",
      err
    }));
};

const getUser = id => {
  return User.findById(
      id
  ).then(user => {
    if (!user) {
      throw new Error("User not found!");
    }
    return user;
  });
};
export { registerUser, loginUser, updateUser, uploadImage, getUser };
