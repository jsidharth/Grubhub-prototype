import Item from "../../models/item.model";
import _ from "lodash";
import Promise from "bluebird";

const handle_request = (item_details, callback) => {
  Item.findById(item_details.id).then(item => {
    if (!item) {
      callback(
        {
          message: "Item not found"
        },
        null
      );
    }
    const { name, section, rate, description } = item_details;
    item.name = name;
    item.section = section;
    item.rate = rate;
    item.description = description;
    item.save().then(updatedItem => {
      if (!updatedItem) {
        callback(
          {
            message: "Updated Item not found"
          },
          null
        );
      }
      callback(null, updatedItem);
    });
  });
};

export { handle_request };
