const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator/check')
const User = require('../model/user_model')
exports.signUp = async (req, res, next)=>{
   try {
        let errors = validationResult(req)
        if(!errors.isEmpty()){
            const error = new Error(errors.array()[0].msg)
            error.statusCode =  422
            throw error
        }
       const {username, email, password, team, profileImage} = req.body
       const hashPassword = await bcrypt.hash(password, 12)
       if(!hashPassword){
           throw error
       }

      let imagePath
       if(req.file){
         imagePath = req.file.path
       }
       const user =  new User({ email, username, team, password: hashPassword, profileImage: imagePath})
       if(!user){
           throw error
       }

        await user.save()
        const token = jwt.sign({id: user._id}, 'topSecret', {
            expiresIn: '1h'
        })
        return res.status(201).json({_id: user._doc._id, email: user._doc.email, profileImage: user._doc.profileImage,
            username: user._doc.username, team: user._doc.team, token })
   } catch (err) {
       if(!err.statusCode){
           err.statusCode = 500
       }
      next(err)
   }
}

exports.getUser = async(req, res, next)=>{
    try {
         const {userId} = req.params
         const user = await User.findById(userId)
            let errors = validationResult(req)
            if(!errors.isEmpty()){
                const error = new Error(errors.array()[0].msg)
                error.statusCode =  422
                throw error
          }
          if(!user){
            const error = new Error('no such user')
            error.statusCode =  422
            throw error
          }
          res.status(200).json({_id: user._doc._id, email: user._doc.email, profileImage: user._doc.profileImage,
            username: user._doc.username, team: user._doc.team, })
    } catch (err) {
        if(!err.statusCode){
            err.statusCode = 500
        }
       next(err)
    }
}
exports.signIn = async (req, res, next)=>{
    try {
        const {username, password} = req.body
        const user = await User.findOne({username})
        let errors = validationResult(req)
        if(!errors.isEmpty()){
            const error = new Error(errors.array()[0].msg)
            error.statusCode =  422
            throw error
        }
        if(!user){
            const error = new Error(`Such user doesn't exist`)
            error.statusCode =  422
            throw error
        }
        const confirmPass = await bcrypt.compare(password, user.password) 
        if(!confirmPass){
            throw error
        }
        const token = jwt.sign({id: user._id}, 'topSecret', {
            expiresIn: '1h'
        })
        return res.status(200).json({_id: user._doc._id, email: user._doc.email, 
            username: user._doc.username, profileImage: user._doc.profileImage, 
            team: user._doc.team, token })
    } catch (err) {
        if(!err.statusCode){
            err.statusCode = 500
        }
       next(err)
    }
}

exports.editProfile = async(req, res, next)=>{
     try {
         const {userId} = req.params
        let errors = validationResult(req)
        if(!errors.isEmpty()){
            const error = new Error(errors.array()[0].msg)
            error.statusCode =  422
            throw error
        }
         const user = await User.findById(userId)
           if(!user){
            const error = new Error('no such user')
            error.statusCode =  422
            throw error
           }
           if(req.file){
               user['profileImage'] = req.file.path
           }
           
           Object.keys(req.body).forEach(key=>{
               user[key] = req.body[key]
           })
          await user.save()
        return res.status(200).json(user)
     } catch (err) {
        if(!err.statusCode){
            err.statusCode = 500
        }
       next(err)
       }
}
exports.refreshToken = async (req, res , next)=>{
  try {
     const {token} = req.query
    const decode = jwt.verify(token, 'topSecret')
    if(!decode){
        const error = new Error('Wrong token provided')
        error.statusCode =  422
        throw error
    }
    const user = await User.findById(decode.id)
    if(!user){
        throw error
    }
    const newToken = jwt.sign({id: user._id}, 'topSecret', {
        expiresIn: '1h'
    })
    return res.status(200).json({_id: user._doc._id, email: user._doc.email, 
        username: user._doc.username, profileImage: user._doc.profileImage, 
        token: newToken, team: user._doc.team})
  } catch (error) {
      throw error
  }
  
}