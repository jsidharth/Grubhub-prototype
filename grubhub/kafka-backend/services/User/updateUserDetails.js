import _ from "lodash";
import User from "../../models/user.model";
import * as updateRestaurantDetails from "../Restaurant/updateRestaurantDetails";

const handle_request = (userDetails, callback) => {
  User.findById(userDetails.user_id).then(user => {
    if (!user) {
      callback({ message: "User not found" }, null);
    }
    const { first_name, last_name, phone, address } = userDetails;
    user.first_name = first_name;
    user.last_name = last_name;
    user.phone = phone;
    user.address = address;
    user.save().then(updatedUser => {
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
        updateRestaurantDetails.handle_request(restaurantDetails, null).then(restaurant => {
          callback(null, {
            user: updatedUser,
            restaurant
          });
        });
      } else {
        callback(null, {
          user: updatedUser
        });
      }
    });
  });
};

export { handle_request };
