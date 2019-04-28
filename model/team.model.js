const mongoose = require('mongoose')

const Schema = mongoose.Schema
const teamSchema = new Schema({
    city:{
        type: String,
        require: true
    },
    logo:{
        type: String,
        require: true
    },
    loss:{
        type: Number
    },
    name: {
        type: String,
        require: true
    },
    wins: {
        type: Number
    },
    game:{
      type: Schema.Types.ObjectId,
      ref: 'Game'
    },
    news: [{
        content:{
            type: String,
            unique: true
        },
        date:{
         type: Date
        },
        image:{
            type: String,
        },
        title:{
            type: String,
            unique: true
        }
    }]
})
teamSchema.methods = {
    addNews(){
        return{
            
        }
    }
}
const Team = mongoose.model('Team', teamSchema)
module.exports = Team