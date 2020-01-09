const mongoose=require('mongoose');
const Schema=mongoose.Schema
const collaboratorSchema= mongoose.Schema({
    collaboratorId:{
        type: Schema.Types.ObjectId,
        require: true,
        ref:'User'
    },
    userID: {
        type: Schema.Types.ObjectId,
        require: true,
        ref:'User'
    },
    noteId: {
        type: Schema.Types.ObjectId,
        require: true,
        ref:'note'
    }
},
{
    timestamps:true

});

let collaborate=mongoose.model('collaborator',collaboratorSchema);

class collaborator{

   /**
     * @function create  function use to collaborate to other user
     * @param {object} req 
     */
    create(req){
        
        return new Promise((resolve, reject) => {
            const dataObject = new collaborate({
                "collaboratorId": req.collaboratorId,  
                "noteId": req.noteId,
                "userID": req.userID                        
            })
            console.log("data....",dataObject);
            
            dataObject.save()
                .then(data => {
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

    delete(deleteData){
        return new Promise((resolve, reject) => {
            console.log("update",deleteData)
            collaborate.findOneAndDelete(deleteData)
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
 module.exports= new collaborator();