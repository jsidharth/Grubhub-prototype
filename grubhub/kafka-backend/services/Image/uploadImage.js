import User from "../../models/user.model";
import Restaurant from "../../models/restaurant.model";
import Item from "../../models/item.model";

const handle_request = (imageDetails, callback) => {
  let uploadImagePromise;
  if (imageDetails.type === "User") {
    uploadImagePromise = User.findById(imageDetails.user_id).then(user => {
      user.image = imageDetails.url;
      user.save();
    });
  }
  if (imageDetails.type === "Restaurant") {
    uploadImagePromise = Restaurant.findById(imageDetails.restaurant_id).then(
      restaurant => {
        restaurant.image = imageDetails.url;
        restaurant.save();
      }
    );
  }
  if (imageDetails.type === "Item") {
    uploadImagePromise = Item.findById(imageDetails.item_id).then(item => {
      item.image = imageDetails.url;
      item.save();
    });
  }
  uploadImagePromise.then(() => {
    callback(null, {
      image: imageDetails.url
    });
  });
};

export { handle_request };
