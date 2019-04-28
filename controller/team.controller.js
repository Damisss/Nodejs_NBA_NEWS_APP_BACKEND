const Team = require('../model/team.model')

exports.createTeam = async (req, res, next)=>{
   try {
         const {city, name , loss, wins} = req.body
         const team =  new Team({
             city, 
             name,
             loss, 
             wins,
             logo: req.file.path
         })
         await team.save()
         return res.status(201).json(team)
   } catch (error) {
       throw error
   }
}
exports.createNews = async(req, res, next)=>{
    try {
        const {teamId} = req.params
        const team = await Team.findById(teamId)
        team.news.push({...req.body, image: req.file.path})
         await team.save()
         return res.status(201).json(team)
    } catch (error) {
        throw error
    }
}

exports.getNews = async(req, res, next)=>{
   try {

       const teams = await Team.find()
       if(!teams){
         const error = new Error('There is no team')
         error.statusCode = 422
         throw error
       }
       const allNews = []
       teams.map(team=>{
           //console.log({...team.news[0]._doc, team: team.name})
        return allNews.push({...team.news[0]._doc, team: team.name}) 
       })
        return res.status(200).json(allNews)
   } catch (err) {
       if(! err.statusCode){
        error.statusCode = 500
       }
      next(err)
   }
}