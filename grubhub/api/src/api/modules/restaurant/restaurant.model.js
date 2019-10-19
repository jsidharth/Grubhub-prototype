import mongoose from "mongoose";
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: String,
  cuisine: String,
  address: String,
  zipcode: Number,
  image: String,
  items: [
      { type: Schema.ObjectId, ref: "Item" }
    ],
  orders: [
      { type: Schema.ObjectId, ref: "Order" }
    ]
});

export default mongoose.model('Restaurant', restaurantSchema);
