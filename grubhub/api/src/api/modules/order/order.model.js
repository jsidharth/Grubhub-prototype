import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    items:[
        {
            _id: false,
            item_id: { type: Schema.ObjectId, ref: "Item" },
            quantity: Number
        }
    ],
    status: String,
    amount: Number
});

export default mongoose.model('Order', orderSchema);