import { Orders, Users, Restaurants, Items, Items_Order } from "./../../../sequelize";
import _ from 'lodash';

const getOrdersByRestaurant = restaurant_id => {
  return Orders.findAll({
    where: {
      restaurant_id
    }
  }).then(allOrders => {
    let current_orders, past_orders;
    current_orders = allOrders.filter(order =>
      ["NEW", "PREPARING", "READY"].includes(order.status)
    );
    past_orders = allOrders.filter(order =>
      ["DELIVERED", "CANCELLED"].includes(order.status)
    );
    return {
      current_orders,
      past_orders
    };
  });
};

const updateOrder = order_details => {
  return Orders.findOne({
    where: {
      id: order_details.id
    }
  }).then(order => {
    return order.update({
      status: order_details.status
    }).then(() => {
      return getOrdersByRestaurant(order.restaurant_id)
    })
  })
}

const getOrderDetails = (order_id) => {
  return Orders.findOne({
    where: {
      id: order_id
    },
    include: [
      {
        model: Users
      },
      {
        model: Restaurants
      }
    ]
  }).then(order => {
    if(!order) {
      throw new Error('Order not found!')
    }
    return Items_Order.findAll({
      where: {
        order_id: order.id
      },
      include: [
        {
          model: Items
        }
      ]
    }).then(allItems => {
      if(!allItems) {
        throw new Error('Order without items');
      }
      let items = [];
      if(allItems && allItems.length) {
        items = allItems.map(eachItem => {
          const {id, name, rate} = eachItem.item;
          return {
            id,
            name,
            rate,
            quantity: eachItem.quantity
          };
        });
      }
      return {
        id: order.id,
        customer: {
          name: order.user.first_name + order.user.last_name,
          address: order.user.address
        },
        items,
        status: order.status,
        amount: order.amount
      };
    })
  })
}

const getOrdersByCustomer = user_id => {
  return Orders.findAll({
    where: {
      user_id
    }
  }).then(allOrders => {
    let current_orders = [], past_orders =[];
    current_orders = allOrders.filter(order =>
      ["NEW", "PREPARING", "READY"].includes(order.status)
    );
    past_orders = allOrders.filter(order =>
      ["DELIVERED", "CANCELLED"].includes(order.status)
    );
    return {
      current_orders,
      past_orders
    };
  });
};
export { getOrdersByRestaurant, updateOrder, getOrderDetails, getOrdersByCustomer};
