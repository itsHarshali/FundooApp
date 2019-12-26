
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
                response.message = " note does note create "
                response.error = errors

                reject(res.status(500).send(response))

            })
        })
    }



    
}

module.exports = new noteController();
