import _ from "lodash";
import { Users } from "../../../sequelize";
import * as restaurantService from "../restaurant/restaurant.service";
import jwtSecret from "../../../../config/jwtConfig";
import jwt from "jsonwebtoken";
import { uploader } from "./../../../../config/cloudinaryConfig";

const registerUser = userDetails => {
  return Users.findOne({
    where: {
      email: userDetails.email
    }
  }).then(user => {
    if (!user) {
      throw new Error("User registration failed");
    }
    // Update User table with registration details
    const { first_name, last_name, type } = userDetails;
    return user
      .update({
        first_name,
        last_name,
        type
      })
      .then(() => {
        return Users.findOne({
          where: {
            email: userDetails.email
          }
        }).then(updatedUser => {
          const token = jwt.sign({ id: updatedUser.id }, jwtSecret.secret);
          const { id, first_name, last_name, email, type } = updatedUser;
          return {
            id,
            first_name,
            last_name,
            email,
            type,
            token
          };
        });
      });
  });
};

const loginUser = userCredentials => {
  return Users.findOne({
    where: {
      email: userCredentials.email
    }
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
    return {
      id,
      first_name,
      last_name,
      email,
      type,
      phone,
      address,
      image,
      token
    };
  });
};

const updateUser = userDetails => {
  return Users.findOne({
    where: {
      id: userDetails.user_id
    }
  }).then(user => {
    if (!user) {
      throw new Error("User not found");
    }
    const { first_name, last_name, phone, address } = userDetails;
    return user
      .update({
        first_name,
        last_name,
        phone,
        address
      })
      .then(() => {
        return Users.findOne({
          where: {
            id: userDetails.id
          }
        }).then(updatedUser => {
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
            if (!userDetails.restaurant_id) {
              return restaurantService
                .createRestaurant(restaurantDetails)
                .then(restaurant => {
                  return {
                    user: updatedUser,
                    restaurant
                  };
                });
            } else {
              return restaurantService
                .updateDetails(restaurantDetails)
                .then(restaurant => {
                  return {
                    user: updatedUser,
                    restaurant
                  };
                });
            }
          } else {
            return {
              user: updatedUser
            };
          }
        });
      });
  });
};

const uploadImage = payload => {
  return uploader
    .upload(payload.file, {transformation: [{width: 150, height: 100, crop: "scale"}]})
    .then(result => {
      const image = result.url;
      return Users.findOne({
        where:{
          id: payload.user_id
        }
      }).then(user => {
        if(!user) {
          throw new Error('User not found!');
        }
        return user.update({
          image
        }).then(() => {
          return ({
            image
          });
        });
      });
    })
    .catch(err => ({
      messge: "someting went wrong while uploading image",
      err
    }));
};

const getUser = id =>{
  return Users.findOne({
    where: {
      id
    }
  }).then(user => {
    if(!user) {
      throw new Error('User not found!');
    }
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
    return {
      id,
      first_name,
      last_name,
      email,
      type,
      phone,
      address,
      image
    };
  })
}
export { registerUser, loginUser, updateUser, uploadImage, getUser };
