import Sequelize from 'sequelize';
import UserModel from './api/modules/user/user.model';
import RestaurantModel from './api/modules/restaurant/restaurant.model';

const sequelize = new Sequelize('grubhub', 'root', 'root123', {
    host: 'localhost',
    dialect: 'mysql'
});

const Users = UserModel(sequelize, Sequelize);
const Restaurants = RestaurantModel(sequelize, Sequelize);

// Users.hasOne(Restaurants);

sequelize.sync()
.then(()=>{
    console.log('Tables created successfully');
})

export {
    Users,
    Restaurants
}