let model = require('../app/models/noteModel')

class Services {
    noteServices(req) {
        return new Promise((resolve, reject) => {
            model.createNote(req).then(data => {
                resolve(data)
            })
                .catch(err => {
                    reject(err)
                })
        })
    }

    updateServices(noteData) {
        try {
            //console.log("in note services",noteData);
            return new Promise((resolve, reject) => {
                //call model method for saving reset password details
                model.updateOne({ "_id": noteData._id }, {
                    $set: {
                        "title": noteData.title,
                        "description": noteData.description
                    }
                })
                    .then((data) => {
                        if (data !== null) {

                            //send data to controller callback function
                            console.log("services", data)
                            resolve(data)
                        }
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        }
        catch (err) {
            console.log(err);
        }
    }

    deleteServices(noteData) {
        try {
            //console.log("in note services",noteData);
            return new Promise((resolve, reject) => {
                //call model method for saving reset password details
                model.delete({ "_id": noteData._id })
                    .then((data) => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        }
        catch (err) {
            console.log(err);
        }
    }

    getAllNotesService(request, callback) {
        try {
            //call model method for saving reset password details
            model.getAllNotes(request, (err, data) => {
                if (err) {
                    //send error to controller callback function
                    return callback(err)
                }
                else {

                    return callback(null, data)
                }
            })
        }
        catch (error) {
            console.log(error);
        }
    }



}
module.exports = new Services();

