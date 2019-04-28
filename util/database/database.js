const mongoose = require('mongoose')

try {
    mongoose.connect('mongodb+srv://Adama:Adam1234@cluster0-5po2q.mongodb.net/NBA?retryWrites=true')
} catch (error) {
    mongoose.createConnection('mongodb+srv://Adama:Adam1234@cluster0-5po2q.mongodb.net/NBA?retryWrites=true')
}

mongoose.connection
.once('open', ()=>console.log('mongoose is running too'))
.on('error', (error)=>{
   throw error
})