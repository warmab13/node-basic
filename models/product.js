const {Schema, model} = require('mongoose');

const ProductSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true
    },
    status: {
        type: Boolean,
        default: true,
        required: [true, 'Status is required']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: [true, 'User ref is required']
    },
    price:{
        type: Number,
        default: 0
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        require: [true, 'Category ref is required']
    },
    description: {
        type: String
    },
    availability: {
        type: Boolean,
        default: true
    },
    img: { type: String }
})

ProductSchema.methods.toJSON = function(){
    const { __v, status, ...data } = this.toObject();
    return data;
}


module.exports = model('Product', ProductSchema);