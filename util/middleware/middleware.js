const jwt = require('jsonwebtoken')
module.exports = async(req, res, next )=>{
    try {
      const token = req.get('Authorization').split(' ')[1]
      const decode = jwt.verify(token, 'topSecret')
       req.userId = decode.id
       console.log(req.userId)
       next()
    } catch (error) {
        throw error
    }
    
}