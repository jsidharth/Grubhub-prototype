import _ from "lodash";
import Restaurant from "../../models/restaurant.model";

const handle_request = (restaurant_id, callback) => {
    Restaurant.findById(
        restaurant_id
      ).then(restaurant => {
        if (!restaurant) {
          callback({
              message: 'No restaurant found'
          }, null);
        }
        callback(null,restaurant) ;
      });
  };
  
  export { handle_request };
  