import _ from "lodash";
import Restaurant from "../../models/restaurant.model";

const handle_request = (restaurantDetails, callback) => {
  Restaurant.findById(restaurantDetails.id).then(restaurant => {
    if (!restaurant) {
      callback(
        {
          message: "No restaurant found"
        },
        null
      );
    }
    restaurant.name = restaurantDetails.restaurant_name;
    restaurant.cuisine = restaurantDetails.cuisine;
    restaurant.address = restaurantDetails.address;
    restaurant.zipcode = restaurantDetails.zipcode;
    restaurant.save().then(updatedRestaurant => {
      if (!callback) {
        return {
          id: updatedRestaurant.id,
          name: updatedRestaurant.name,
          cuisine: updatedRestaurant.cuisine,
          image: updatedRestaurant.image,
          address: updatedRestaurant.address,
          zipcode: updatedRestaurant.zipcode
        };
      }
      callback(null, {
        id: updatedRestaurant.id,
        name: updatedRestaurant.name,
        cuisine: updatedRestaurant.cuisine,
        image: updatedRestaurant.image,
        address: updatedRestaurant.address,
        zipcode: updatedRestaurant.zipcode
      });
    });
  });
};

export { handle_request };
