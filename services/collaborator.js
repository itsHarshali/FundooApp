let model = require('../app/models/collaborator')
let noteModel = require('../app/models/note')
const logger = require('../config/winston.js')

class Services {
    /**
     * @function collaboratorService is a function use to note collaborate to other user
     * @param {object} req  
     */

    collaboratorService(userData) {
        logger.info("userData", userData);
        return new Promise((resolve, reject) => {
            model.create(userData)
                .then(data => {
                    logger.info("daata in collabo serv ", data);
                    //noteModel.noteServices({ "noteId": data.noteId }, {"collaboratorId": data.collaboratorId}) 

                    noteModel.updateOne({ "_id": data.noteId }, {
                        $push: {
                            "collaborators": data.collaboratorId
                        }
                    }).then(data => {
                        logger.info(data);

                        resolve(data)
                    })
                        .catch(err => {
                            reject(err)
                        })

                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    deleteServices(data) {
        try {
            //logger.info("in  services",data);
            return new Promise((resolve, reject) => {
                //call model method for saving reset password details
                model.delete({ "_id": data._id })
                    .then((data) => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        }
        catch (err) {
            logger.info(err);
        }
    }


}
module.exports = new Services()    