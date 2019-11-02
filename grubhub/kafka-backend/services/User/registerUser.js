import _ from "lodash";
import User from "../../models/user.model";
import Restaurant from "../../models/restaurant.model";
import jwtSecret from "../../config/jwtConfig";
import jwt from "jsonwebtoken";

const handle_request = (userDetails, callback) => {
  User.findOne({
    email: userDetails.email
  }).then(user => {
    if (!user) {
      callback({
        message: "User registration failed"
      }, null);
    }
    // Update User table with registration details
    user.first_name = userDetails.first_name;
    user.last_name = userDetails.last_name;
    user.type = userDetails.type;
    var restaurantPromise =
      userDetails.type === "Owner" ? Restaurant.create({}) : Promise.resolve();
    restaurantPromise.then(restaurant => {
      if (restaurant) {
        user.restaurant = restaurant.id;
      }
      user.save().then(updatedUser => {
        const token = jwt.sign({ id: updatedUser.id }, jwtSecret.secret);
        const { id, first_name, last_name, email, type } = updatedUser;
        callback(null, {
            id,
            first_name,
            last_name,
            email,
            type,
            token,
            restaurant
          });
      });
    });
  });
};

export {
    handle_request
} ;
