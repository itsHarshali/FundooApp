const mongoose = require('mongoose');
const logger =require('../../config/winston.js')

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

    imageUrl: {
        type: String
    },

    addImage: {
        type: String,
        default: null
    },
    colorNote: {
        type: String,
        default: null
    },
    
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
            let noteData = new user({
                "title": req.title,
                "description": req.description,
                "userID": req.userID,
                "reminder": null,
                "isArchive": false,
                "trash": false,
                "labels":req.labels, 
                "collaborators":req.collaborators,
                "colorNote": null
            })
            noteData.save()
                .then(data => {
                    logger.info('Note save sucessfully', data.title);
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
        logger.info("data", noteData)
        return new Promise((resolve, reject) => {
            logger.info("update", updateData)
            user.findOneAndUpdate(noteData, updateData,{"new":true})
                .then(data => {
                    logger.info("model", data)
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
                    //logger.info("Email id  not found ", data);
                    resolve(data)
                })
                .catch(err => {
                    //logger.info("Email id found ", data);
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
            logger.info('req')
            user.find({}, (err, data) => {
                if (err) {
                    return callback(err,null)
                }
                else {
                    logger.info(data)
                    return callback(null, data);
                }
            })
        }
        catch (err) {
            logger.info(err)
        }
    }

    //retriving all user details
    getAll(req) {
        //logger.info("r",request);
        return new Promise((resolve, reject) => {
            user.find({}).populate('labels').populate('collaborator')
                .then(data => {
                    //logger.info("all data found ", data);
                    resolve(data)
                })
                .catch(err => {
                    // logger.info(" data not found ", data);
                    reject(err)
                })
        })
    }

    //retriving all user details
    getSearch(request) {
        logger.info("r", request.searchKey);

        return new Promise((resolve, reject) => {
            //$regex:
            user.find({
                $or: [
                    { "title": { $regex: request.searchKey } },
                   // { "label": { $regex: request.searchKey } },
                    { "description": { $regex: request.searchKey } }]
            })
                .then(data => {
                    // logger.info("all data found ", );
                    resolve(data)
                })
                .catch(err => {
                    // logger.info(" data not found ", data);
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
            logger.info("update", deleteData)
            user.findOneAndDelete(deleteData)
                .then(data => {
                    logger.info("model", data)
                    resolve(data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
}

module.exports = new noteModel()