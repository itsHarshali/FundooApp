const mongoose = require('mongoose');
const Schema = mongoose.Schema
const noteSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    userID: {
        type: Schema.Types.ObjectId,//referencing other documents from other collections
        require: true
    },
    collaborators: [{             
        type: Schema.Types.ObjectId,
        ref:'collaborator'
    }],
    labels: [{            
        type: Schema.Types.ObjectId,
        ref:'label'
    }],
    reminder: {
        type: Date,
        default: null
    },
    isArchive: {
        type: Boolean,
        default: false
    },
    trash: {
        type: Boolean,
        default: false
    },

    selectColor: {
        type: String,
        default: null
    },
    imageUrl: {
        type: String
    },

    addImage: {
        type: String,
        default: null
    }
    
},
    {
        timestamps: true
    });

let user = mongoose.model('note', noteSchema);
class noteModel {
    /**
    * @function createNote create note function use to create note 
    * @param {*} req 
    */
    createNote(req) {
        return new Promise((resolve, reject) => {
            console.log("req",req.labels);
            
            let noteData = new user({
                "title": req.title,
                "description": req.description,
                "userID": req.userID,
                "reminder": null,
                "isArchive": false,
                "trash": false,
                "labels":req.labels, 
                "collaborators":req.collaborators
            })
            noteData.save()
                .then(data => {
                    console.log('Note save sucessfully', data.title);
                    resolve(data)
                })
                .catch(err => {
                    reject(err)
                })
        })
            .catch((error) => {
                reject(error)
            })
    }


    /**
     * @function updateOne update note function use to update note 
     * @param {*} noteData 
     * @param {*} updateData  
     */

    updateOne(noteData, updateData) {
        console.log("data", noteData)
        return new Promise((resolve, reject) => {
            console.log("update", updateData)
            user.findOneAndUpdate(noteData, updateData)
                .then(data => {
                    console.log("model", data)
                    resolve(data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    /**
     * @function findOne findone function use to find Emailid from database
     * @param {*} finddata 
     */

    findOne(finddata) {
        return new Promise((resolve, reject) => {
            user.findOne({ "emailid": finddata.emailid })
                .then(data => {
                    //console.log("Email id  not found ", data);
                    resolve(data)
                })
                .catch(err => {
                    //console.log("Email id found ", data);
                    reject(err)
                })
        })
    }

    /**
    * @function getAllNotes getAllNotes is function use to display all notes record from database
    * @param {*} req 
    * @param {*} callback  
    */

    getAllNotes(req, callback) {
        try {
            console.log('req')
            user.find({}, (err, data) => {
                if (err) {
                    return callback(err)
                }
                else {
                    console.log(data)
                    return callback(null, data);
                }
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    //retriving all user details
    getAll(req) {
        //console.log("r",request);

        return new Promise((resolve, reject) => {
            user.find({}).populate('label').populate('collaborator')
                .then(data => {
                    //console.log("all data found ", data);
                    resolve(data)
                })
                .catch(err => {
                    // console.log(" data not found ", data);
                    reject(err)
                })
        })
    }

    //retriving all user details
    getSearch(request) {
        console.log("r", request.searchKey);

        return new Promise((resolve, reject) => {
            //$regex:
            user.find({
                $or: [
                    { "title": { $regex: request.searchKey } },
                   // { "label": { $regex: request.searchKey } },
                    { "description": { $regex: request.searchKey } }]
            })
                .then(data => {
                    // console.log("all data found ", );
                    resolve(data)
                })
                .catch(err => {
                    // console.log(" data not found ", data);
                    reject(err)
                })
        })
    }

    /**
     * @function delete  function use to delete  notes record from database
     * @param {*} deleteData 
     */

    delete(deleteData) {
        return new Promise((resolve, reject) => {
            console.log("update", deleteData)
            user.findOneAndDelete(deleteData)
                .then(data => {
                    console.log("model", data)
                    resolve(data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
}

module.exports = new noteModel()