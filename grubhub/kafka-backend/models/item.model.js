import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: String,
    rate:  Number,
    description: String,
    image: String,
    section: String
});

itemSchema.index({
    name: 'text'
});

export default mongoose.model('Item', itemSchema);