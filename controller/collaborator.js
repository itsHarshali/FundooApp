let service = require('../services/collaborator');
const logger = require('../config/winston.js')
require('express-validator');

class labelController {

    createCollaborator(req, res) {
        logger.info("req.body.data._id---", req.body.data._id);
        let response = {}
        try {
            logger.info("req.body---,", req.body);
            let data = {
                userID: req.body.data._id,
                noteId: req.params.noteId,
                collaboratorId: req.params.collaboratorId
            }
            logger.info("data ---", data);
            service.collaboratorService(data)
                .then(data => {
                    response.success = true
                    response.message = " collaborate note sucessesfully"
                    response.data = data
                    return res.status(200).send(response)
                })
                .catch(errors => {
                    response.success = false
                    response.message = " collaborate note  does not create "
                    response.error = errors

                    return res.status(422).send(response)

                })
        }
        catch (error) {
            response.success = false
            response.message = " something wrong "
            response.error = errors
            return res.status(500).send(response)
        }
    }
    /**
          * @function noteDelete is a function use to Delete  note  from database
          * @param {string} req 
          * @param {string} res 
          */
    deleteCollaborator(req, res) {
        let response = {}
        try {
            const data = {}
            data._id = req.params.collaboratorId,
                data.userID = req.body.data._id

            return new Promise((resolve, reject) => {
                service.deleteServices(data)
                    .then(data => {
                        response.success = true
                        response.message = " collaborator delete sucessesfully"
                        response.data = data
                        resolve(res.status(200).send(response))
                    })
                    .catch(errors => {
                        response.success = false
                        response.message = " collaborator does not delete "
                        response.error = errors
                        reject(res.status(422).send(response))
                    })
            })
        }
        catch (error) {
            response.success = false
            response.message = error
            reject(res.status(500).send(response))
        }
    }
}

module.exports = new labelController()