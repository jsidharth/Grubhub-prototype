import Item from "../../models/item.model";
import Restaurant from "../../models/restaurant.model";
import _ from "lodash";
import Promise from "bluebird";

const handle_request = (itemDetails, callback) => {
  Item.findByIdAndDelete(itemDetails.item_id).then(() => {
    Restaurant.findById(itemDetails.restaurant_id).then(restaurant => {
      restaurant.items = restaurant.items.filter(
        item => item !== itemDetails.item_id
      );
      restaurant.save().then(() =>
        callback(null, {
          message: "Deleted Successfully"
        })
      );
    });
  });
};

export { handle_request };
