import Item from "../../models/item.model";
import Restaurant from "../../models/restaurant.model";
import _ from "lodash";
import Promise from "bluebird";

const handle_request = (search_key, callback) => {
    Item.aggregate([{
        $match: {
            name: {
            $regex: search_key,
            $options: 'i'
        }
        }
    }]).then(searchItems => {
         Promise.map(searchItems, item => {
            return Restaurant.findOne({
                items: item._id
            }).then(item_restaurant => {
                console.log('Here', item_restaurant)
                if(item_restaurant) {
                    return item_restaurant.toJSON();
                }
            });
        }).then(restaurants => {
            console.log('Again here', restaurants)
            callback(null, {
                search_results: _.chain(restaurants).compact().uniqBy('_id').value()
            });
        });
    });
};

export { handle_request };
