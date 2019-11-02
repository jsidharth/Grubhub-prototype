import _ from "lodash";
import Restaurant from "../../models/restaurant.model";

const handle_request = (restaurant_id, callback) => {
  Restaurant.findById(restaurant_id)
    .populate("items")
    .lean()
    .then(restaurant => {
      if (!restaurant) {
        callback(
          {
            message: "No restaurant found"
          },
          null
        );
      }
      if (!restaurant.items || !restaurant.items.length) {
        callback(null, []);
      }
      const groupedItems = _.chain(restaurant.items)
        .groupBy("section")
        .map((value, key) => {
          value = _.map(value, item => {
            item.id = item._id;
            return item;
          });
          return {
            section: key,
            id: value[0]._id,
            items: value
          };
        })
        .flatten()
        .sortBy(each => each.section.toLowerCase())
        .value();
      if (!callback) {
        return groupedItems;
      }
      callback(null, groupedItems);
    });
};

export { handle_request };
