import _ from "lodash";
import * as getRestaurantMenu from "./getRestaurantMenu";
import Item from "../../models/item.model";
import Promise from "bluebird";

const handle_request = (section, callback) => {
    if(!section.items || !section.items.length) {
        callback({
            message:'No items in section.'
        }, null);
      }
      Promise.map(section.items, item => {
        return Item.findById(item)
        .then(currentItem => {
          currentItem.section = section.updated_name;
          return currentItem.save()
        })
      }).then(() => {
        getRestaurantMenu.handle_request(section.restaurant_id, callback);
      });
};

export { handle_request };
