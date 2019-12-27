
const jwtTokenGenerator = require('../utility/TokenGeneration');
const mailSender = require('../utility/mailSender');
let service = require('../services/noteServices')
require('express-validator');
class noteController {
    /**
     * @function note for note description all data 
     * @param {*} req 
     * @param {*} res 
     */
    note(req, res) {
        req.checkBody('description', 'please add description ').isLength({ min: 1 })
        // req.checkBody('password', 'Password contain alphabetical chars and numbers')
        const errors = req.validationErrors();
        let response = {}
        if (errors) {
            response.success = false
            response.error = errors
            return res.status(422).send(response)//The 422 (Unprocessable Entity) status code 
        }

        let Data = {
            title: req.body.title,
            description: req.body.description,
        }
        return new Promise((resolve, reject) => {
        service.noteServices(Data)
            .then(data => {
                response.success = true
                response.message = " note create sucessesfully"
                response.data = data
                resolve(res.status(200).send(response))
            })
            .catch(errors => {
                response.success = false
                response.message = " note does not create "
                response.error = errors

                reject(res.status(500).send(response))

            })
        })
    }

    noteUpdate(req, res) {
        //console.log("controller.....",req.body);
        let response = {}
        const noteData = {}
        noteData._id= req.body._id,
        noteData.title= req.body.title,
        noteData.description= req.body.description
        
        return new Promise((resolve, reject) => {
        service.updateServices(noteData)
            .then(data => {
                response.success = true
                response.message = " note update sucessesfully"
                response.data = data
                resolve(res.status(200).send(response))
            })
            .catch(errors => {
                response.success = false
                response.message = " note does not update "
                response.error = errors
                reject(res.status(500).send(response))

            })
        })
    }

noteDelete(req,res){
    let response = {}
        const noteData = {}
        noteData._id= req.body._id
        
        return new Promise((resolve, reject) => {
        service.deleteServices(noteData)
            .then(data => {
                response.success = true
                response.message = " note delete sucessesfully"
                response.data = data
                resolve(res.status(200).send(response))
            })
            .catch(errors => {
                response.success = false
                response.message = " note does not delete "
                response.error = errors
                reject(res.status(500).send(response))

            })
        })
}

    allNotes(request, response) {
        let res = {}
        //call userServices methods and pass the object
        service.getAllNotesService(request, (err, data) => {
            if (err) {
                console.log(err)
                res.success = false,
                    res.err = err
                return response.status(500).send(res);
            } else {
                res.success = data.success;
                res.data = data;
                return response.status(200).send(res)
            }
        })
    }


}

module.exports = new noteController();
