
let express = require('express')
let routes = express.Router()
let token = require('../utility/TokenGeneration.js')
let models = require('../app/models/user')
let user = require('../controller/user')
let note = require('../controller/note')
routes.post('/registration', user.registration)
routes.post('/login', user.login)
routes.post('/forgetPassword', user.forgetPasswordController)
routes.post('/reset', token.verifyToken, user.resetPasswordController)

routes.post('/notes', token.verifyToken, note.note)
routes.get('/notes', note.allNotes)
routes.put('/notes/:noteId', note.noteUpdate)
routes.delete('/notes/:noteId', note.noteDelete)

routes.post('/isArchive/:noteId',note.isArchive)
//routes.delete('/isArchive/:noteId',note.deleteArchive)**
routes.put('/isArchive/:noteId',note.isUnArchive)
routes.get('/isArchive' ,token.verifyToken,note.AllArchive)


routes.delete('/trash/:noteId',note.deleteTrash) 
routes.put('/trash/:noteId',note.restoreTrash) 
routes.get('/trash',token.verifyToken,note.allTrash) 

routes.get('/noteSequence',token.verifyToken, note.noteSequence)

routes.put('/reminder/:noteId',note.reminder)

routes.get('/isEmailVerified/:url', (request, response) => {
    console.log("email verifcation..", request.params.url);
    return new Promise((resolve, reject) => {
        models.findOne({ 'urlCode': request.params.url })
            .then((data) => {
                console.log('daa  jhjhjhj', data);

                if (data === null) {
                    //Not Found, 404, Page Not Found, or Server Not Found error message
                    reject(response.status(404).send('url not found'))
                }
                else {
                    resolve(response.redirect(data.longUrl))
                }
            })
            .catch((error) => {
                reject(response.status(404).send('url not found', error))
            })
    })
})

routes.post('/isEmailVerified', token.verifyToken, user.isEmailVerified)

const upload = require('../services/file-upload')

const singleUpload = upload.single('image');

routes.post('/image-upload/:userId', function (req, res) {
    let data={}
    data._id=req.params.userId
    
    console.log("user Id",req.params.userId);  
    singleUpload(req, res, function (err) {
        if (err) {          
            console.log('File ERROR', err);
            return res.status(422).send({ errors: [{ title: 'File Upload Error', detail: err.message }] });
        }
        console.log('request',req.file.location);  
        data.imageUrl=req.file.location   
        user.addImage(data,res)       
        //return res.json({ 'imageUrl': req.file.location });
    });
});

module.exports = routes  