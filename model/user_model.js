const mongoose = require('mongoose')

const Schema  = mongoose.Schema

const userSchema = new Schema({
    username:{
        type: String,
        require: [true, 'username is require'],
        unique: true
    },
    email:{
        type: String,
        require: [true, 'email is require'],
        unique: true
    },
    password:{
        type: String,
        require: [true, 'password is require'],
        minlength: 6
    },
    team:{
       type: String,
    },
    profileImage:{
       type: String,
    }
    // confirmPassword:{
    //     type: String,
    //     require: true
    // }
})

const User = mongoose.model('User', userSchema)

module.exports = User