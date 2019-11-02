import _ from "lodash";
import User from "../../models/user.model";

const handle_request = (user_id, callback) => {
  User.findById(user_id)
    .populate("orders")
    .lean()
    .then(user => {
      let current_orders, past_orders;
      current_orders = user.orders.filter(order =>
        ["NEW", "PREPARING", "READY"].includes(order.status)
      );
      past_orders = user.orders.filter(order =>
        ["DELIVERED", "CANCELLED"].includes(order.status)
      );
      callback(null, {
        current_orders,
        past_orders
      });
    });
};

export { handle_request };
