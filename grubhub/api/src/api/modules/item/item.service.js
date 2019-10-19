
import Item from "./item.model";
import Restaurant from "./../restaurant/restaurant.model";
import _ from 'lodash';
import Promise from 'bluebird';
import { uploader } from "./../../../../config/cloudinaryConfig";
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

const addItem = (item_details) => {
    const {name, rate, description, image, section} = item_details;
    return Item.create({
        name,
        rate,
        description,
        image,
        section
    }).then(item => {
        if(!item) {
            throw new Error('Item creation failed');
        }
        return Restaurant.findByIdAndUpdate(item_details.restaurant_id, {
            $push: {items: item._id} 
        }).then(() => {
            return item;
        });
    });
}

const getItemDetails = (item_id) => {
    return Item.findOne({_id: item_id}).then(item => {
        if(!item) {
            throw new Error('Item not found!');
        }
        return item;
    });
}

const updateItem = (item_details) => {
    return Item.findById(item_details.id).then(item => {
    if(!item) {
        throw new Error('Item not found');
    }
    const {name, section, rate, description} = item_details;
    item.name = name;
    item.section = section;
    item.rate = rate;
    item.description = description;
    return item.save().then(updatedItem => {
            if(!updatedItem) {
                throw new Error('Updated Item not found');
            }
            return updatedItem;
        });
    });
}

const deleteItem = (itemDetails) => {
    return Item.findByIdAndDelete(
        itemDetails.item_id
    ).then(() => {
        return Restaurant.findById(itemDetails.restaurant_id).then(restaurant => {
            restaurant.items = restaurant.items.filter(item => item !== itemDetails.item_id)
            return restaurant.save().then(() => ({
                message: 'Deleted Successfully'
            }))
        })
    });
}

const searchItems = (search_key) => {
    return Item.aggregate([{
        $match: {
            name: {
            $regex: search_key,
            $options: 'i'
        }
        }
    }]).then(searchItems => {
        return Promise.map(searchItems, item => {
            return Restaurant.findOne({
                items: item._id
            }).then(item_restaurant => {
                if(item_restaurant) {
                    return item_restaurant.toJSON();
                }
            });
        }).then(restaurants => {
            return {
                search_results: _.chain(restaurants).compact().uniqBy('_id').value()
            };
        });
    });
}

const uploadImage = payload => {
    return uploader
      .upload(payload.file, {transformation: [{width: 150, height: 100, crop: "scale"}]})
      .then(result => {
        const image = result.url;
        return Item.findById(payload.item_id).then(item => {
          if(!item) {
            throw new Error('Item not found!');
          }
          item.image = image;
          return item.save().then(() => ({
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
    addItem,
    getItemDetails,
    updateItem,
    deleteItem,
    searchItems,
    uploadImage
}