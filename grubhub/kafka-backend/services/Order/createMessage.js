import _ from "lodash";
import Order from "../../models/order.model";
import * as getOrderDetails from "./getOrderDetail";

const handle_request = (message_details, callback) => {
  return Order.findById(message_details.order_id).then(order => {
    if (!order) {
      callback(
        {
          message: "Order doesn't exist"
        },
        null
      );
    }
    if (message_details.user_type === "Owner") {
      order.customer_messages.push(message_details.body);
    } else {
      order.owner_messages.push(message_details.body);
    }
    order.save().then(updatedOrder => {
      getOrderDetails.handle_request(updatedOrder._id, callback);
    });
  });
};

export { handle_request };
