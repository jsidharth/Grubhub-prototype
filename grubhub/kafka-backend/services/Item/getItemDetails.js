import Item from "../../models/item.model";
import _ from "lodash";
import Promise from "bluebird";

const handle_request = (item_id, callback) => {
  Item.findOne({ _id: item_id }).then(item => {
    if (!item) {
      callback(
        {
          message: "Item not found!"
        },
        null
      );
    }
    callback(null, item);
  });
};

export { handle_request };
