import Restaurant from "./restaurant.model";
import Item from "./../item/item.model";
import _ from "lodash";
import Promise from 'bluebird';
import { uploader } from "./../../../../config/cloudinaryConfig";

//TODO: Check impact if removed
const createRestaurant = restaurantDetails => {
  return Restaurant.create({
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

const getRestaurant = restaurant_id => {
  return Restaurant.findById(
    restaurant_id
  ).then(restaurant => {
    if (!restaurant) {
      return {};
    }
    return restaurant;
  });
};

const updateDetails = restaurantDetails => {
  return Restaurant.findById(
      restaurantDetails.id
  ).then(restaurant => {
    if(!restaurant) {
      throw new Error('No restaurant found');
    }
    restaurant.name = restaurantDetails.restaurant_name;
    restaurant.cuisine = restaurantDetails.cuisine;
    restaurant.address = restaurantDetails.address;
    restaurant.zipcode = restaurantDetails.zipcode;
    return restaurant
      .save()
      .then(updatedRestaurant => ({
            id: updatedRestaurant.id,
            name: updatedRestaurant.name,
            cuisine: updatedRestaurant.cuisine,
            image: updatedRestaurant.image,
            address: updatedRestaurant.address,
            zipcode: updatedRestaurant.zipcode
      }));
  });
};

const getRestaurantMenu = restaurant_id => {
  return Restaurant.findById(
      restaurant_id
    ).populate('items')
    .lean()
    .then(restaurant => {
    if (!restaurant) {
      throw new Error("No restaurant found");
    }
    if (!restaurant.items || !restaurant.items.length) {
      return [];
    }
    const groupedItems = _.chain(restaurant.items)
      .groupBy("section")
      .map((value, key) => {
        value = _.map(value, (item) => {
          item.id = item._id;
          return item
        });
        return {
          section: key,
          id: value[0]._id,
          items: value
        }
          
      })
      .flatten()
      .sortBy(each => each.section.toLowerCase())
      .value();
    return groupedItems;
  });
};

const getRestaurantDetails = restaurant_id => {
  return Restaurant.findById(
    restaurant_id
  ).lean().then(restaurant => {
    if (!restaurant) {
      throw new Error("Restaurant not found");
    }
    return getRestaurantMenu(restaurant_id).then(menu => {
      restaurant.menu = menu;
      restaurant.id = restaurant._id;
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
    return Item.findById(item)
    .then(currentItem => {
      currentItem.section = section.updated_name;
      return currentItem.save()
    })
  }).then(() => {
    return getRestaurantMenu(section.restaurant_id);
  }).catch(err => ({
      message: err
    }));
}

const deleteSection = section => {
  if(!section.items || !section.items.length) {
    throw new Error('No items in section.')
  }
  return Restaurant.findById(section.restaurant_id).then(restaurant => {
    return Promise.map(section.items, item => {
        return Item.findByIdAndDelete(item);
    }).then(() => {
      restaurant.items = _.filter(restaurant.items, item => !section.items.includes(item._id.toString()));
      return restaurant.save().then((updatedRestaurant) => {
        return getRestaurantMenu(updatedRestaurant.id);
      });
    });
  }).catch(err => {
    return ({
      message: err
    });
  });
  
}

const uploadImage = payload => {
  return uploader
    .upload(payload.file, {transformation: [{width: 150, height: 100, crop: "scale"}]})
    .then(result => {
      const image = result.url;
      return Restaurant.findById(
          payload.restaurant_id
        ).then(restaurant => {
        if(!restaurant) {
          throw new Error('Restaurant not found!');
        }
        restaurant.image = image;
        return restaurant.save().then(() => ({
          image
        }));
      });
    })
    .catch(err => ({
      messge: "Someting went wrong while uploading image",
      err
    }));
};

export {
  createRestaurant,
  updateDetails,
  getRestaurant,
  getRestaurantMenu,
  getRestaurantDetails,
  updateSection,
  deleteSection,
  uploadImage
};
