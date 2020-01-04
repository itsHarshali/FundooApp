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
/**
     * @function allNotes is a function use to Display all  notes
     * @param {*} req 
     * @param {*} res 
     */
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
archive(request){
        console.log(" verify-----", request);
        return new Promise((resolve, reject) => {
            model.updateOne({ "_id": request}, { "isArchive": true })
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

isTrash(request){
    return new Promise((resolve,reject)=>{
        model.updateOne({"_id":request},{"trash":true})
        .then(data=>{
            resolve(data)
        })
        .catch(error=>{
            reject(error)
        })
    })
}

getAllTrash(request){
console.log("req in services",request);

        return new Promise((resolve,reject)=>{
        model.getAll(request)
        .then(data=>{
            if(trash==true){
                console.log(data);
                
            resolve(data)
            }
            else {
                console.log("nothing in trash")
                reject(error)
            }
        })
        .catch(error=>{
            reject(error)
        })
         
    })
}

}
module.exports = new Services();

