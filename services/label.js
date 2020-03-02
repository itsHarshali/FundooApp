let model = require('../app/models/label')
let logger = require('../config/winston.js')

class Services {
    /**
     * @function labelServices is a function use to provide service to create label
     * @param {object} req  
     */
    labelService(req) {
        logger.info("req", req);
        return new Promise((resolve, reject) => {
            model.createLabel(req).then(data => {
                resolve(data)
            })
                .catch(err => {
                    reject(err)
                })
        })
    }
    /**
         * @function updateServices is a function use to update note
         * @param {object} data  
         */
    updateServices(data) {
        try {
            logger.info("in note services", data, "data._id", data._id);
            return new Promise((resolve, reject) => {
                //call model method for saving reset password details
                model.updateOne({ "_id": data._id }, {
                    $set: {
                        "label": data.label
                    }
                })
                    .then((data) => {
                        if (data !== null) {

                            //send data to controller callback function
                            logger.info("services", data)
                            resolve(data)
                        }
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
    /**
        * @function deleteServices is a function use to delete perticular label
        * @param {object} data  
        */
    deleteServices(data) {
        try {
            //logger.info("in note services",data);
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

    allLabel(request) {
        logger.info("req in services", request);
        return new Promise((resolve, reject) => {
            model.getAll(request)
                .then(data => {
                    resolve(data)
                    //logger.info("array in services", data.reverse());
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
}
module.exports = new Services();