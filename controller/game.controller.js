const Team = require('../model/team.model')
const Game = require('../model/game.model')

exports.creatGame = async (req, res, next)=>{
    try {
         const{firstTeam, secondTeam} = req.query
         const {date, time} = req.body
          const game = new Game({
              local: firstTeam,
              away: secondTeam,
              play: req.file.path,
              date,
              time
          })
          await game.save()
          return res.status(201).json(game)
    } catch (error) {
        throw error
    }
}

exports.getAllGames = async (req, res, next)=>{
    try {
        const games = await Game.find().populate('away').populate('local')
        if(!games){

        } 
        let game = []
        games.map(elt=>{
          return game.push({date: elt.date, play: elt.play, time: elt.time, gameId: elt._id,
            createdAt: elt.createdAt, localTeam: elt.local.name, localCity: elt.local.city, localLogo: elt.local.logo,
        loclaLoss: elt.local.loss, localWins: elt.local.wins, localId: elt.local._id,
        awayTeam: elt.away.name, awayCity: elt.away.city, awayLogo: elt.away.logo,
        awayLoss: elt.away.loss, awayWins: elt.away.wins, awayId: elt.away._id })
        })
       return res.status(200).json(game)
    } catch (error) {
        throw error
    }
}
