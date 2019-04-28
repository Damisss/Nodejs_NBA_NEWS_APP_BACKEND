const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: function(req, file, cb){
      cb(null, './video')
    },
    filename: function(req, file, cb){
       cb(null, new Date().toISOString() + file.originalname)
    }
})
require('./util/database/database')
const userRoutes = require('./routes/user_routes')
const teamRoutes = require('./routes/team.routes')
const gameRoutes = require('./routes/game.routes')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Origin, X-Requested-With, Accept')
    res.setHeader('Access-Control-Allow-Methods', 'POST, PATCH, GET, PUT, DELETE, OPTIONS')
   next()
})
app.use((error, req, res, next)=>{
   const status = error.statusCode || 500
   const message = error.message
   res.status(status).json({message})
})
 function filterFile(req, file, cb){
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' 
  || file.mimetype === 'image/jpg' || file.mimetype === 'video/mp4' ){
    cb(null, true)
  }else{
      cb(null, false)
  } 
}
app.use(multer({storage: storage, limits:{
    fieldSize: 1024*1024 *5
},
fileFilter: filterFile
}).single('profileImage'))
app.use('/video', express.static(path.join(__dirname, 'video')))
app.use('/user', userRoutes)
app.use('/team', teamRoutes)
app.use('/game', gameRoutes)
app.listen(3000, ()=>console.log('server is running at'))