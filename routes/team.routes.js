const express = require('express')
const teamController = require('../controller/team.controller')
const router = express.Router()

router.post('/createTeam',teamController.createTeam )
router.post('/createNews/:teamId', teamController.createNews)
router.get('/getNews', teamController.getNews)
module.exports= router