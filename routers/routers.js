
let express = require('express')
let routes = express.Router()
let token = require('../utility/TokenGeneration.js')
let models =require('../app/models/usermodel')
let userController = require('../controller/userController')
let noteController = require('../controller/noteConroller')

// let userController = new Controller();
//routes.post('/registration', userController.registration)
routes.post('/registration',userController.registration)
 routes.post('/login', userController.login)
 routes.post('/forgetPassword', userController.forgetPasswordController)
routes.post('/reset',token.verifyToken,userController.resetPasswordController)
// routes.post('/disply',userController.allUserDetailsController)
routes.post('/createNote',noteController.note)



routes.get('/isEmailVerified/:url',(request,response)=>{
    return new Promise((resolve,reject)=>{
        models.findOne({'urlcode':request.params.urlcode}).then((data)=>{
            if(data=== null){
                //Not Found, 404, Page Not Found, or Server Not Found error message
                reject(response.status(404).send('url not found'))
            }
            else{
                resolve(response.redirect(data.longUrl))
            }
        })
        .catch((error)=>{
            reject(response.status(404).send('url not found',error))
        })
    })
})
routes.post('/isEmailVerified',token.verifyToken, userController.isEmailVerified)


module.exports = routes  