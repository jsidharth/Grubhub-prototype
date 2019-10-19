import Promise from "bluebird";
import _ from "lodash";
import Order from "./order.model";
import User from "./../user/user.model";
import Item from "./../item/item.model";
import Restaurant from "./../restaurant/restaurant.model";

const getOrdersByRestaurant = restaurant_id => {
  return Restaurant.findById(
      restaurant_id
    ).populate('orders')
    .lean().then(restaurant => {
    let current_orders, past_orders;
    current_orders = restaurant.orders.filter(order =>
      ["NEW", "PREPARING", "READY"].includes(order.status)
    );
    past_orders = restaurant.orders.filter(order =>
      ["DELIVERED", "CANCELLED"].includes(order.status)
    );
    return {
      current_orders,
      past_orders
    };
  });
};

const updateOrder = order_details => {
  return Order.findById(order_details.id).then(order => {
    order.status = order_details.status;
    return order.save().then(updatedOrder => {
      return getOrdersByRestaurant(updatedOrder.restaurant_id)
    });
  });
};

const getOrderDetails = order_id => {
  return Order.findById(order_id)
  .populate('items.item_id')
  .lean()
  .then(order => {
    const items = order.items.map(item => ({
      id: item.item_id._id,
      name: item.item_id.name,
      quantity: item.quantity,
      rate: item.item_id.rate
    }));
    return User.findOne({
      orders: order_id
    }).then(user => {
      return {
        id: order._id,
        customer: {
          name: user.first_name + " " + user.last_name,
          address: user.address
        },
        items,
        status: order.status,
        amount: order.amount
      }
    })
  })
};

const getOrdersByCustomer = user_id => {
  return User.findById(user_id)
  .populate('orders')
  .lean().then(user => {
    let current_orders, past_orders;
    current_orders = user.orders.filter(order =>
      ["NEW", "PREPARING", "READY"].includes(order.status)
    );
    past_orders = user.orders.filter(order =>
      ["DELIVERED", "CANCELLED"].includes(order.status)
    );
    return {
      current_orders,
      past_orders
    };
  });
};

const createOrder = order_details => {
  return Order.create({
    amount: order_details.total_amount,
    status: "NEW"
  }).then(order => {
    if(order_details.cart && order_details.cart.length) {
      order_details.cart.map(item => {
        order.items.push({
          item_id: item.id,
          quantity: item.quantity
        })
      })
    }
    return order.save().then(updatedOrder => {
      const restaurantOrderPromise = Restaurant.findById(order_details.restaurant_id).then(restaurant => {
        restaurant.orders.push(updatedOrder._id)
        return restaurant.save();
      });
      const customerOrderPromise = User.findById(order_details.user_id).then(user => {
        user.orders.push(updatedOrder._id)
        return user.save();
      });
      return Promise.all(restaurantOrderPromise, customerOrderPromise).then(() => {
        console.log("here")
        return updatedOrder;
      }).catch(err => {
        console.log(err)
      })
    });
  });
};

export {
  getOrdersByRestaurant,
  updateOrder,
  getOrderDetails,
  getOrdersByCustomer,
  createOrder
};
