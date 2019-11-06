import _ from "lodash";
import Order from "../../models/order.model";
import User from "../../models/user.model";

const handle_request = (order_id, callback) => {
  return Order.findById(order_id)
    .populate("items.item_id")
    .lean()
    .then(order => {
      const items = order.items.map(item => ({
        id: item.item_id._id,
        name: item.item_id.name,
        quantity: item.quantity,
        rate: item.item_id.rate
      }));
      User.findOne({
        orders: order_id
      }).then(user => {
        callback(null, {
          id: order._id,
          customer: {
            name: user.first_name + " " + user.last_name,
            address: user.address
          },
          items,
          status: order.status,
          amount: order.amount,
          owner_messages: order.owner_messages,
          customer_messages: order.customer_messages
        });
      });
    });
};

export { handle_request };
