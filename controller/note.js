
const logger =require('../config/winston.js')
let service = require('../services/note')
require('express-validator');
class noteController {
    
    /**
     * @function note create note function use to create note 
     * @param {string} req 
     * @param {string} res 
     */
    note(req, res) {
        let response = {}
        try {
            req.checkBody('description', 'please add description ').isLength({ min: 1 })
            const errors = req.validationErrors();
            if (errors) {
                response.success = false
                response.error = errors
                return res.status(422).send(response)//The 422 (Unprocessable Entity) status code 
            }
            logger.info("userId:req.body._id,", req.body);

            let data = {
                userID: req.body.data._id,
                title: req.body.title,
                description: req.body.description,
                labels:req.body.labels,
                collaborators:req.body.collaborators
            }
                service.noteServices(data)
                    .then(data => {
                        response.success = true
                        response.message = " note create sucessesfully"
                        response.data = data
                        return res.status(200).send(response)
                    })
                    .catch(errors => {
                        response.success = false
                        response.message = " note does not create "
                        response.error = errors

                        return res.status(422).send(response)

                    })
          
        }
        catch (error) {
            response.success = false
            response.message = " something wrong "
            response.error = errors           
            reject(res.status(500).send(response))
        }
    }
    /**
         * @function noteUpdate is a function use to Update  note  from database
         * @param {object} req 
         * @param {object} res 
         */
    noteUpdate(req, res) {
                                                                                                                                                                                                                                                                                                                                                                                                                    
        //logger.info("controller.....",req.param.d);
        let response = {}
        const noteData = {}
        try{
            noteData._id = req.params.noteId,
            noteData.userID= req.body.data._id,
            noteData.title = req.body.title,
            noteData.description = req.body.description,
            noteData.labels=req.body.labels,
            noteData.reminder = req.body.reminder,     
            noteData.colorNote = req.body.colorNote
            noteData.collaborators=req.body.collaborators

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

    colorNote(req, res) {                                                                                                                                                                                                                                                                                                                                                                                                                    
        //logger.info("controller.....",req.param.d);
        let response = {}
        const noteData = {}
        try{
            noteData._id = req.params.noteId,
            noteData.userID= req.body.data._id
            noteData.colorNote = req.body.colorNote
         
        return new Promise((resolve, reject) => {
            service.updateColor(noteData)
                .then(data => {
                    response.success = true
                    response.message = " note color sucessesfully"
                    response.data = data
                    resolve(res.status(200).send(response))
                })
                .catch(errors => {
                    response.success = false
                    response.message = " note does not color "
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
    /**
         * @function noteDelete is a function use to Delete  note  from database
         * @param {string} req 
         * @param {string} res 
         */
    noteDelete(req, res) {
        let response = {}
        try{
        const noteData = {}
       
        noteData._id = req.params.noteId
        noteData.userID= req.body.data._id
        return new Promise((resolve, reject) => {
            service.deleteTrashServices(noteData)
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
    /** 
         * @function allNotes is a function use to Display all  notes
         * @param {string} request 
         * @param {string} response 
         */

    allNotes(request, response) {
        let res = {}
        try{
        //call userServices methods and pass the object
        service.getAllNotesService(request, (err, data) => {
            if (err) {
                logger.info(err)
                res.success = false,
                    res.err = err
                return response.status(422).send(res);
            } else {
                res.success = data.success;
                res.data = data;
                return response.status(200).send(res)
            }
        })
    }
    catch (error) {
        response.success = false
        response.message = error           
        reject(res.status(500).send(response))
    }
    }
    /**
       * @function isArchive Archive note function use to Archive notes  
       * @param {string} req 
       * @param {string} res 
       */
    isArchive(req, res) {
        let response = {}
        try{
        const noteData = {}
        noteData._id = req.params.noteId
        noteData.userId = req.body.data._id
        //logger.info("notedat", noteData);

        service.archive(noteData)
            .then(data => {
                response.success = true
                response.message = " note archive successfully"
                response.data = data
                return res.status(302).send(response)//302 status code for data found
            })
            .catch(errors => {
                response.success = false
                response.message = " note does not archive "
                response.error = errors
                return res.status(422).send(response)
            })
        }
        catch (error) {
            response.success = false
            response.message = error           
            reject(res.status(500).send(response))
        }
    }

    /**
         * @function isUnArchive  note function use to unArchive notes  
         * @param {string} req 
         * @param {string} res 
         */
    isUnArchive(req, res) {
        let response = {}
        try{
        const noteData = {}
        noteData._id = req.params.noteId
        //logger.info("notedat", noteData);

        service.unArchive(noteData)
            .then(data => {
                response.success = true
                response.message = " note archive Restore successfully"
                response.data = data
                return res.status(302).send(response)//302 status code for data found
            })
            .catch(errors => {
                response.success = false
                response.message = "archive note does not Restore  "
                response.error = errors
                return res.status(422).send(response)
            })
        }
        catch (error) {
            response.success = false
            response.message = error           
            reject(res.status(500).send(response))
        }
    }

    /**
     * @function AllArchive  note function use to Display all Archive notes  
     * @param {string} req 
     * @param {string} res 
     */
    AllArchive(request, response) {
        let res = {}
        try{
        const noteData = {}
        noteData._id = request.body.data._id
        service.getAllArchive(noteData)
            .then(data => {
                res.success = data.success;
                res.data = data;
                return response.status(200).send(res)
            })
            .catch(error => {
                res.success = false,
                    res.error = error
                return response.status(422).send(res)
            })
        }
        catch (error) {
            response.success = false
            response.message = error           
            reject(res.status(500).send(response))
        }
    }

    /**
        * @function restoreTrash  note function use to restore notes from Trash    
        * @param {string} req 
        * @param {string} res 
        */
    restoreTrash(request, res) {
        let response = {}
        try{
        const noteData = {}
        noteData._id = request.params.noteId
        noteData.userID= request.body.data._id

        // logger.info('noteId',noteData);

        service.restoreTrash(noteData)
            .then(data => {
                response.success = true
                response.message = "note restore successfully"
                response.data = data
                return res.status(200).send(response)
            })
            .catch(error => {
                response.success = false
                response.message = "note does not restore successfully "
                response.error = error
                return res.status(422).send(response)
            })
        }
        catch (error) {
            response.success = false
            response.message = error           
            return res.status(500).send(response)   
        }
    }

    /**
        * @function deleteTrash  note function use to delete  notes from Trash   
        * @param {string} req 
        * @param {string} res 
        */
    deleteTrash(req, res) {
        let response = {}
        try{
        const noteData = {}
        noteData._id = req.params.noteId
        noteData.userID= req.body.data._id

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

    /**
        * @function allTrash  note function use to display all  notes from Trash   
        * @param {string} req 
        * @param {string} res 
        */
    allTrash(request, response) {
        logger.info('ALLTRASH')
        let res = {}
        try{
        const noteData = {}
        noteData._id = request.body.data._id
        service.getAllTrash(noteData)
            .then(data => {
                res.success = data.success;
                res.data = data;
                return response.status(200).send(res)
            })
            .catch(error => {
                res.success = false,
                    res.error = error
                return response.status(422).send(res)
            })
        }
        catch (error) {
            response.success = false
            response.message = error           
           return response.status(500).send(response)
        }
    }

    /**
        * @function reminder   function use to set reminder on note  
        * @param {string} req 
        * @param {string} res 
        */
    reminder(req, res) {
        let response = {}
        try{
        const noteData = {}
        noteData.userID= req.body.data._id
        noteData._id = req.params.noteId
        noteData.reminder = req.body.reminder
        //logger.info("notedat", noteData);
        service.setReminder(noteData)
            .then(data => {
                response.success = true
                response.message = " note reminder set successfully"
                response.data = data
                return res.status(302).send(response)//302 status code for data found
            })
            .catch(errors => {
                response.success = false
                response.message = " reminder does not set  "
                response.error = errors
                return res.status(422).send(response)
            })
        }
        catch (error) {
            response.success = false
            response.message = error           
            return res.status(500).send(response)
        }
    }
    removeReminder(req, res) {
        let response = {}
        try{
        const noteData = {}
        noteData.userID= req.body.data._id
        noteData._id = req.params.noteId
        //logger.info("notedat", noteData);
        service.removeReminder(noteData)
            .then(data => {
                response.success = true
                response.message = " remove Reminder from note successfully"
                response.data = data
                return res.status(302).send(response)//302 status code for data found
            })
            .catch(errors => {
                response.success = false
                response.message = "  does not remove Reminder  "
                response.error = errors
                return res.status(422).send(response)
            })
        }
        catch (error) {
            response.success = false
            response.message = error           
            return res.status(500).send(response)
        }
    }

    /**
         * @function noteSequence  note function use display all notes in sequencelly
         * @param {string} req 
         * @param {string} res 
         */
    noteSequence(request, response) {
        let res = {}
        try{
        const noteData = {}
        noteData._id = request.body.data._id
        service.noteSequence(noteData)
            .then(data => {
                res.success = data.success;
                res.data = data;
                return response.status(200).send(res)
            })
            .catch(error => {
                res.success = false,
                    res.error = error
                return response.status(422).send(res)
            })
        }
        catch (error) {
            response.success = false
            response.message = error           
            reject(res.status(500).send(response))
        }
    }
    
    allReminder(request, response) {
        let res = {}
        try{
        const noteData = {}
        noteData._id = request.body.data._id
        service.allReminder(noteData)
            .then(data => {
                res.success = data.success;
                res.data = data;
                return response.status(200).send(res)
            })
            .catch(error => {
                res.success = false,
                    res.error = error
                return response.status(422).send(res)
            })
        }
        catch (error) {
            response.success = false
            response.message = error           
            reject(res.status(500).send(response))
        }
    }
    search(request, response) {
        let res = {}
        try{
        const data = {}
        data.searchKey = request.params.searchKey
        data._id = request.body.data._id
        service.search(data)
            .then(data => {
               // logger.info("da----",data.description);
                
               // data.description= {$regex: /^a/ }

                res.success = data.success;
                res.data = data;
                return response.status(200).send(res)
            })
            .catch(error => {
                res.success = false,
                    res.error = error
                return response.status(422).send(res)
            })
        }
        catch (error) {
            response.success = false
            response.message = error           
            return response.status(500).send(response)
        }
    }

}
module.exports = new noteController();
