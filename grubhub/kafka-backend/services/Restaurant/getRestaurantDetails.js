import _ from "lodash";
import Restaurant from "../../models/restaurant.model";
import * as getRestaurantMenu from "./getRestaurantMenu";

const handle_request = (restaurant_id, callback) => {
  Restaurant.findById(restaurant_id)
    .lean()
    .then(restaurant => {
      if (!restaurant) {
        callback(
          {
            message: "Restaurant not found"
          },
          null
        );
      }
      getRestaurantMenu.handle_request(restaurant_id, null).then(menu => {
        restaurant.menu = menu;
        restaurant.id = restaurant._id;
        callback(null, {
          current_restaurant: restaurant
        });
      });
    });
};

export { handle_request };
