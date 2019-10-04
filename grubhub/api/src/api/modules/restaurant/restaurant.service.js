import { Restaurants, Items, Items_Restaurant } from "../../../sequelize";
import _ from "lodash";
import Promise from 'bluebird';

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

const getRestaurant = user_id => {
  return Restaurants.findOne({
    where: {
      user_id
    }
  }).then(restaurant => {
    if (!restaurant) {
      return {};
    }
    return restaurant;
  });
};

const updateDetails = restaurantDetails => {
  return Restaurants.findOne({
    where: {
      id: restaurantDetails.id
    }
  }).then(restaurant => {
    if(!restaurant) {
      throw new Error('No restaurant found');
    }
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

const getRestaurantMenu = restaurant_id => {
  return Restaurants.findOne({
    where: {
      id: restaurant_id
    }
  }).then(restaurant => {
    if (!restaurant) {
      throw new Error("No restaurant found");
    }
    return Items_Restaurant.findAll({
      where: {
        restaurant_id
      },
      include: [
        {
          model: Items
        },
        {
          model: Restaurants
        }
      ]
    }).then(allItems => {
      if (!allItems || !allItems.length) {
        return [];
      }
      const groupedItems = _.chain(allItems)
        .map("item")
        .groupBy("section")
        .map((value, key) => ({
          section: key,
          id: value[0].id,
          items: value
        }))
        .flatten()
        .sortBy(each => each.section.toLowerCase())
        .value();
      return groupedItems;
    });
  });
};

const getRestaurantDetails = restaurant_id => {
  return Restaurants.findOne({
    where: {
      id: restaurant_id
    }
  }).then(restaurant => {
    if (!restaurant) {
      throw new Error("Restaurant not found");
    }
    return getRestaurantMenu(restaurant_id).then(menu => {
      restaurant.dataValues.menu = menu;
      return {
        current_restaurant: restaurant
      };
    });
  });
};

const updateSection = section => {
  if(!section.items || !section.items.length) {
    throw new Error('No items in section.')
  }
  return Promise.map(section.items, item => {
    return Items.findOne({
      where: {
        id: item
      }
    }).then(currentItem => {
      return currentItem.update({
        section: section.updated_name
      })
    })
  }).then(() => {
    return getRestaurantMenu(section.restaurant_id);
  }).catch(err => {
    return ({
      message: err
    });
  });
}

const deleteSection = section => {
  if(!section.items || !section.items.length) {
    throw new Error('No items in section.')
  }
  return Promise.map(section.items, item => {
    return Items_Restaurant.destroy({
      where: {
        item_id: item
      }
    }).then(() => {
      return Items.destroy({
        where: {
          id: item
        }
      });
    });
  }).then(() => {
    return getRestaurantMenu(section.restaurant_id);
  }).catch(err => {
    return ({
      message: err
    });
  });
  
}
export {
  createRestaurant,
  updateDetails,
  getRestaurant,
  getRestaurantMenu,
  getRestaurantDetails,
  updateSection,
  deleteSection
};
