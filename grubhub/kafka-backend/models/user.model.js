import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    type: String,
    phone: String,
    address: String,
    image: String,
    restaurant: {type: Schema.ObjectId, ref: 'Restaurant'},
    orders:[{type: Schema.ObjectId, ref: 'Order'}]
});

export default mongoose.model('User', userSchema);