
let express = require('express')
let routes = express.Router()
let token = require('../utility/TokenGeneration.js')
let models = require('../app/models/usermodel')
let userController = require('../controller/userController')
let noteController = require('../controller/noteConroller')

// let userController = new Controller();
//routes.post('/registration', userController.registration)
routes.post('/registration', userController.registration)
routes.post('/login', userController.login)
routes.post('/forgetPassword', userController.forgetPasswordController)
routes.post('/reset', token.verifyToken, userController.resetPasswordController)
// routes.post('/disply',userController.allUserDetailsController)
routes.post('/createNote', noteController.note)
routes.post('/updateNote', noteController.noteUpdate)
routes.post('/allNotes', noteController.allNotes)
routes.post('/deleteNote', noteController.noteDelete)
routes.post('/isEmailVerified', token.verifyToken, userController.isEmailVerified)
 
// routes.get('/isEmailVerified/:url',(request,response)=>{
//     return new Promise((resolve,reject)=>{
//         models.findOne({'urlcode':request.params.urlcode})
//         .then((data)=>{
//             console.log('daa  jhjhjhj',data);

//             if(data=== null){
//                 //Not Found, 404, Page Not Found, or Server Not Found error message
//                 reject(response.status(404).send('url not found'))
//             }
//             else{
//                 resolve(response.redirect(data.longUrl))
//             }
//         })
//         .catch((error)=>{
//             reject(response.status(404).send('url not found',error))
//         })
//     })
// })





const upload = require('../services/file-upload')
const singleUpload = upload.single('image');

routes.post('/image-upload', function (req, res) {

    singleUpload(req, res, function (err) {

        if (err) {
            console.log('File ERRO',err);
            
            return res.status(422).send({ errors: [{ title: 'File Upload Error', detail: err.message }] });
        }

        return res.json({ 'imageUrl': req.file.location });
    });
});

module.exports = routes  