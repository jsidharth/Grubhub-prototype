import Item from "../../models/item.model";
import Restaurant from "../../models/restaurant.model";
import _ from "lodash";
import Promise from "bluebird";

const handle_request = (item_details, callback) => {
  const { name, rate, description, image, section } = item_details;
  Item.create({
    name,
    rate,
    description,
    image,
    section
  }).then(item => {
    if (!item) {
      callback(
        {
          message: "Item creation failed"
        },
        null
      );
    }
    Restaurant.findByIdAndUpdate(item_details.restaurant_id, {
      $push: { items: item._id }
    }).then(() => {
      callback(null, item);
    });
  });
};

export { handle_request };
