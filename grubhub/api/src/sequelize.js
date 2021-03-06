import Sequelize from 'sequelize';
import UserModel from './api/modules/user/user.model';
import RestaurantModel from './api/modules/restaurant/restaurant.model';
import OrderModel from './api/modules/order/order.model';
import {itemModel, itemOrderModel, itemRestaurantModel} from './api/modules/item/item.model';

const sequelize = new Sequelize('grubhub', 'root', 'root123', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    pool: {
        max: 10,
        min: 0,
        idle: 10000
      }
});

//Table creations
const Users = UserModel(sequelize, Sequelize);
const Restaurants = RestaurantModel(sequelize, Sequelize);
const Orders = OrderModel(sequelize, Sequelize);
const Items = itemModel(sequelize, Sequelize);
const Items_Order = itemOrderModel(sequelize, Sequelize);
const Items_Restaurant = itemRestaurantModel(sequelize, Sequelize);

//Associations
Orders.belongsTo(Users);
Orders.belongsTo(Restaurants);
Items_Order.belongsTo(Orders);
Items_Order.belongsTo(Items);
Items_Restaurant.belongsTo(Restaurants);
Items_Restaurant.belongsTo(Items);

sequelize.sync()
.then(()=>{
    console.log('Tables created successfully');
}).catch(err => {
    console.log('Error while table creation', err.message);
})

export {
    Users,
    Restaurants,
    Orders,
    Items,
    Items_Order,
    Items_Restaurant
}