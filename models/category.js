const {Schema, model} = require('mongoose');

const CategorySchema = Schema({
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
    }
})

CategorySchema.methods.toJSON = function(){
    const { __v, status, ...data } = this.toObject();
    return data;
}


module.exports = model('Category', CategorySchema);