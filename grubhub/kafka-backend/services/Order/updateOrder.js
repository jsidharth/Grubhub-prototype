import _ from "lodash";
import Order from "../../models/order.model";
import * as getOrdersByRestaurant from "./getOrderByRestaurant";
import Restaurant from "../../models/restaurant.model";

const handle_request = (order_details, callback) => {
    Order.findById(order_details.id).then(order => {
        order.status = order_details.status;
        order.save().then(updatedOrder => {
          Restaurant.findOne({
            orders: updatedOrder._id,
          }).then(restaurant => {
            getOrdersByRestaurant.handle_request(restaurant._id, callback);
          });
        });
      });
};

export { handle_request };
