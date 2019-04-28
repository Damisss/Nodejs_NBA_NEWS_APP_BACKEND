const express = require('express')
const gameController = require('../controller/game.controller')
const router = express.Router()

router.post('/createGame', gameController.creatGame )
router.get('/getGame', gameController.getAllGames)

module.exports = router 