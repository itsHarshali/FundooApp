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



}
module.exports= new noteModel()