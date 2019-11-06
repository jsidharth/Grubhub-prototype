import _ from "lodash";
import Order from "../../models/order.model";
import User from "../../models/user.model";
import Restaurant from "../../models/restaurant.model.js";
import Promise from "bluebird";

const handle_request = (order_details, callback) => {
  Order.create({
    amount: order_details.total_amount,
    status: "NEW"
  }).then(order => {
    if (order_details.cart && order_details.cart.length) {
      order_details.cart.map(item => {
        order.items.push({
          item_id: item.id,
          quantity: item.quantity
        });
      });
    }
    return order.save().then(updatedOrder => {
      const restaurantOrderPromise = Restaurant.findById(
        order_details.restaurant_id
      ).then(restaurant => {
        restaurant.orders.push(updatedOrder._id);
        return restaurant.save();
      });
      const customerOrderPromise = User.findById(order_details.user_id).then(
        user => {
          user.orders.push(updatedOrder._id);
          return user.save();
        }
      );
      return Promise.all([restaurantOrderPromise, customerOrderPromise])
        .then(() => {
          callback(null, updatedOrder);
        })
        .catch(err => {
          console.log(err);
          callback(
            {
              message: "Something went wrong"
            },
            null
          );
        });
    });
  });
};

export { handle_request };
