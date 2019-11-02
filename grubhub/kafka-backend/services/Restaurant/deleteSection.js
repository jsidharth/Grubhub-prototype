import _ from "lodash";
import * as getRestaurantMenu from "./getRestaurantMenu";
import Restaurant from "../../models/restaurant.model";
import Item from "../../models/item.model";
import Promise from "bluebird";

const handle_request = (section, callback) => {
    if(!section.items || !section.items.length) {
        callback({
            message:'No items in section.'
        }, null);
      }
      Restaurant.findById(section.restaurant_id).then(restaurant => {
         Promise.map(section.items, item => {
            return Item.findByIdAndDelete(item);
        }).then(() => {
          restaurant.items = _.filter(restaurant.items, item => !section.items.includes(item._id.toString()));
          restaurant.save().then((updatedRestaurant) => {
            getRestaurantMenu.handle_request(updatedRestaurant.id, callback);
          });
        });
      });
};

export { handle_request };
