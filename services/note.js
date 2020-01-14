let model = require('../app/models/note')

class Services {
    /**
     * @function noteServices is a function use to provide service to create notes
     * @param {*} req  
     */
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
    /**
         * @function updateServices is a function use to update note
         * @param {*} noteData  
         */
    updateServices(noteData) {
        try {
            //console.log("in note services",noteData);
            return new Promise((resolve, reject) => {
                //call model method for saving reset password details
                model.updateOne({ "_id": noteData._id }, {
                    $set: {
                        "title": noteData.title,
                        "description": noteData.description,
                        "labels":noteData.labels,
                        "collaborators":noteData.collaborators
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
    /**
         * @function deleteServices is a function use to delete perticular note
         * @param {*} req 
         * @param {*} res 
         */
    deleteServices(noteData) {
        try {
            //console.log("in note services",noteData);
            return new Promise((resolve, reject) => {
                //call model method for saving reset password details
                model.updateOne({ "_id": noteData._id }, { 'trash': true })
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
    /**
         * @function getAllNotesService is a function use to Display all  notes
         * @param {*} request 
         * @param {*} callback 
         */
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
    archive(request) {
        console.log(" verify----->", request);
        return new Promise((resolve, reject) => {
            model.updateOne({ "_id": request }, { "isArchive": true })
                .then(data => {
                    console.log(" data in services", data)
                    resolve(data)
                })

                .catch(err => {
                    console.log("error in services", err);
                    reject(err)
                })
        })

    }
    unArchive(request) {
        console.log(" verify-----", request);
        return new Promise((resolve, reject) => {
            model.updateOne({ "_id": request }, { "isArchive": false })
                .then(data => {
                    console.log(" data in services", data)
                    resolve(data)
                })

                .catch(err => {
                    console.log("error in services", err);
                    reject(err)
                })
        })

    }

    getAllArchive(request) {
        console.log("req in services", request);
        let array = [];
        return new Promise((resolve, reject) => {
            model.getAll(request)
                .then(data => {
                    data.forEach(element => {
                    if (element.userID === request._id || element.trash === false && element.isArchive === true) {
                            array.push(element)
                            resolve(array)
                        }
                    });
                    console.log("array in services", array);
                })
                .catch(error => {
                    reject(error)
                })
        })
    }


    restoreTrash(request) {
        return new Promise((resolve, reject) => {
            model.updateOne({ "_id": request }, { "trash": false })
                .then(data => {
                    resolve(data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    /**
         * @function deleteServices is a function use to delete perticular note
         * @param {*} req 
         * @param {*} res 
         */
    deleteTrashServices(noteData) {
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

    getAllTrash(request) {
        console.log("req in services", request);
        let array = [];
        return new Promise((resolve, reject) => {
            model.getAll(request)
                .then(data => {
                    data.forEach(element => {
                        if (element.userID === request._id || element.isArchive === false && element.trash === true) {
                            array.push(element)
                            resolve(array)
                        }
                    });
                    console.log("array in services", array);
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    setReminder(request) {
        console.log(" verify----->", request);
        return new Promise((resolve, reject) => {
            model.updateOne({ "_id": request._id }, { "reminder": request.reminder })
                .then(data => {
                    console.log(" data in services", data)
                    resolve(data)
                })

                .catch(err => {
                    console.log("error in services", err);
                    reject(err)
                })
        })

    }

      /**
         * @function deleteServices is a function use to delete perticular note
         * @param {object} noteData 
         
         */
        removeReminder(noteData) {
            try {
                //console.log("in note services",noteData);
                return new Promise((resolve, reject) => {
                    //call model method for saving reset password details
                    model.updateOne({ "_id": noteData._id }, { 'reminder': null })
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

    noteSequence(request) {
        console.log("req in services", request);
        let array = [];
        return new Promise((resolve, reject) => {
            model.getAll(request)
                .then(data => {
                    //console.log("------data---",data);

                    data.forEach(element => {
                        if (element.userID === request._id  || element.trash === false) {
                            array.push(element)
                            //console.log("------arr---",array);
                            resolve(array)
                        }
                    });
                    console.log("array in services", array.reverse());
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
    search(request) {
        console.log("req in services", request);
        return new Promise((resolve, reject) => {
            model.getSearch(request)
                .then(data => {
                    console.log("data in s",data);
                    
                  // { description: { $regex: /^a/, $options: 'i' } } )
                    resolve(data)
                    //console.log("array in services", data.reverse());
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

}
module.exports = new Services();

