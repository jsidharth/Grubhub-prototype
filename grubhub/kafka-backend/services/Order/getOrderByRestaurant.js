import _ from "lodash";
import Restaurant from "../../models/restaurant.model";

const handle_request = (restaurant_id, callback) => {
  Restaurant.findById(restaurant_id)
    .populate("orders")
    .lean()
    .then(restaurant => {
      let current_orders, past_orders;
      current_orders = restaurant.orders.filter(order =>
        ["NEW", "PREPARING", "READY"].includes(order.status)
      );
      past_orders = restaurant.orders.filter(order =>
        ["DELIVERED", "CANCELLED"].includes(order.status)
      );
      callback(null, {
        current_orders,
        past_orders
      });
    });
};

export { handle_request };
