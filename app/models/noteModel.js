const mongoose= require('mongoose');

const noteSchema= mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },


})

let user = mongoose.model('note', noteSchema);

class noteModel{
    createNote(req){
        return new Promise((resolve, reject) => {
            let noteData = new user({
                "title": req.title,
                "description": req.description,
            })
                noteData.save().then(data => {
                    console.log('Note save sucessfully' , data.title);
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


    updateOne(noteData, updateData) {
        console.log("data",noteData) 
        return new Promise((resolve, reject) => {
            console.log("update",updateData)
            user.findOneAndUpdate(noteData,updateData)
            .then(data => {
                console.log("model",data)
                resolve(data)
            })
                .catch(error => {
                    reject(error)
                })
        })
    }


    findOne(finddata) {
        return new Promise((resolve, reject) => {
            user.findOne({ "emailid": finddata.emailid }).then(data => {
                //console.log("Email id  not found ", data);
                resolve(data)
            })
                .catch(err => {
                    //console.log("Email id found ", data);
                    reject(err)
                })
        })
    }

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
    delete(deleteData){
        return new Promise((resolve, reject) => {
            console.log("update",deleteData)
            user.findOneAndDelete(deleteData)
            .then(data => {
                console.log("model",data)
                resolve(data)
            })
                .catch(error => {
                    reject(error)
                })
        })
    }

}
module.exports= new noteModel()