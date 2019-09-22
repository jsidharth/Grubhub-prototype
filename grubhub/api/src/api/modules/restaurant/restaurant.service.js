import { Restaurants } from "../../../sequelize";

const createRestaurant = restaurantDetails => {
  return Restaurants.create({
    name: restaurantDetails.restaurant_name,
    cuisine: restaurantDetails.cuisine,
    image: restaurantDetails.restaurant_image,
    user_id: restaurantDetails.user_id,
    address: restaurantDetails.address,
    zipcode: restaurantDetails.zipcode
  }).then(restaurant => {
    if (!restaurant) {
      throw new Error("Error while creating restaurant");
    }
    return {
      id: restaurant.id,
      name: restaurant.name,
      cuisine: restaurant.cuisine,
      image: restaurant.image,
      address: restaurant.address,
      zipcode: restaurant.zipcode
    };
  });
};

const getRestaurant = (user_id) => {
    return Restaurants.findOne({
        where: {
            user_id
        }
    }).then(restaurant => {
        if(!restaurant) {
            return {}
        }
        return restaurant;
    });
};

const updateDetails = (restaurantDetails) => {
  return Restaurants.findOne({
    where: {
      id: restaurantDetails.id
    }
  }).then(restaurant => {
    return restaurant
      .update({
        name: restaurantDetails.restaurant_name,
        cuisine: restaurantDetails.cuisine,
        image: restaurantDetails.restaurant_image,
        address: restaurantDetails.address,
        zipcode: restaurantDetails.zipcode
      })
      .then(updatedRestaurant => {
        return Restaurants.findOne({
          where: {
            id: updatedRestaurant.id
          }
        }).then(restaurant => {
          return {
            id: restaurant.id,
            name: restaurant.name,
            cuisine: restaurant.cuisine,
            image: restaurant.image,
            address: restaurant.address,
            zipcode: restaurant.zipcode
          };
        });
      });
  });
};

const getOrders = (restaurant_id) => {
    return 
}
export { createRestaurant, updateDetails, getRestaurant};
