/*{
    name: '',
    email: 'alonso@gmail.com',
    password: 'sad65a468as4d68a4sd684',//Hash,
    img: 'link.png',
    role: 'admin',
    status: false,
    google: false
}*/

const {Schema, model} = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name required']
    },
    email:{
        type: String,
        required: [true, 'Email required'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'Password required']
    },
    img:{
        type: String
    },
    role:{
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
})


module.exports = model('User', UserSchema);