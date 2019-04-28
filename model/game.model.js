const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gameSchema = new Schema({
    away: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    },
    local:{
        type: Schema.Types.ObjectId,
        ref: 'Team'
    },
     play: {
       type: String,
       require: true
     },
     date:{
         type: Date,
         require: true
     },
     time:{
         type: String,
         require: true
     }
}, {timestamps: true})

const Game = mongoose.model('Game', gameSchema)

module.exports = Game