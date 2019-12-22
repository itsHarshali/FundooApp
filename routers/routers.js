
let express = require('express')
let routes = express.Router()
let token = require('../utility/TokenGeneration.js')
let con = require('../controller/userController')

let userController = new con.Controller

//routes.post('/registration', userController.registration)
routes.post('/registration',userController.registration)
 routes.post('/login', userController.login)
 routes.post('/forgetPassword', userController.forgetPasswordController)
routes.post('/reset',token.verifyToken,userController.resetPasswordController)
// routes.post('/disply',userController.allUserDetailsController)


//routes.post('/')

module.exports = routes  