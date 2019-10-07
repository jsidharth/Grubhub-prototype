import { Items, Items_Restaurant, Restaurants } from "./../../../sequelize";
import _ from 'lodash';
import Sequelize from 'sequelize';
import Promise from 'bluebird';
import { uploader } from "./../../../../config/cloudinaryConfig";
const Op = Sequelize.Op;

const addItem = (item_details) => {
    const {name, rate, description, image, section} = item_details;
    return Items.create({
        name,
        rate,
        description,
        image,
        section
    }).then(item => {
        if(!item) {
            throw new Error('Item creation failed');
        }
        return Items_Restaurant.create({
            item_id: item.id,
            restaurant_id: item_details.restaurant_id
        }).then(() => {
            return item;
        });
    });
}

const getItemDetails = (item_id) => {
    return Items.findOne({
        where: {
            id: item_id
        }
    }).then(item => {
        if(!item) {
            throw new Error('Item not found!');
        }
        return item;
    });
}

const updateItem = (item_details) => {
    return Items.findOne({
        where: {
            id: item_details.id
        }
    }).then(item => {
        if(!item) {
            throw new Error('Item not found');
        }
        const {name, section, rate, description} = item_details;
        return item.update({
            name,
            section,
            rate,
            description
        }).then(() => {
            return Items.findOne({
                where: {
                    id: item_details.id
                }
            }).then(updatedItem => {
                if(!updatedItem) {
                    throw new Error('Updated Item not found');
                }
                return updatedItem;
            });
        });
    });
}

const deleteItem = (item_id) => {
    return Items_Restaurant.destroy({
        where: {
            item_id
        }
    }).then(rows => {
        if(!rows) {
            throw new Error('Item not deleted')
        }
        return Items.destroy({
            where: {
                id: item_id
            }
        }).then(rows => {
            if(!rows) {
                throw new Error('Item not deleted')
            }
            return {
                message: "Deleted Successfully"
            };
        });
    })
}

const searchItems = (search_key) => {
    search_key = `%${search_key}%`;
    return Items.findAll({
        where: {
            name: {
                [Op.like]: search_key
            }
        }
    }).then(searchItems => {
        return Promise.map(searchItems, item => {
            return Items_Restaurant.findOne({
                where: {
                    item_id: item.id
                },
                include: [
                    {
                        model: Restaurants
                    }
                ]
            }).then(item_restaurant => {
                if(item_restaurant) {
                    return item_restaurant.restaurant;
                }
            });
        }).then(restaurants => {
            return {
                search_results: _.chain(restaurants).compact().uniqBy('id').value()
            };
        });
    });
}

const uploadImage = payload => {
    return uploader
      .upload(payload.file, {transformation: [{width: 150, height: 100, crop: "scale"}]})
      .then(result => {
        const image = result.url;
        return Items.findOne({
          where:{
            id: payload.item_id
          }
        }).then(item => {
          if(!item) {
            throw new Error('Item not found!');
          }
          return item.update({
            image
          }).then(() => {
            return ({
              image
            });
          });
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