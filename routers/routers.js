
let express = require('express')
let routes = express.Router()
let token = require('../utility/TokenGeneration.js')
let userController = require('../controller/userController')

// let userController = new Controller();
//routes.post('/registration', userController.registration)
routes.post('/registration',userController.registration)
 routes.post('/login', userController.login)
 routes.post('/forgetPassword', userController.forgetPasswordController)
routes.post('/reset',token.verifyToken,userController.resetPasswordController)
// routes.post('/disply',userController.allUserDetailsController)



module.exports = routes  