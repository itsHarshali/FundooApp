const mongoose=require('mongoose');
const logger =require('../../config/winston.js')
const Schema=mongoose.Schema
const labelSchema= mongoose.Schema({
    label:{
        type:String,
        require:true
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

let label=mongoose.model('label',labelSchema);

class Label{

   /**
     * @function createLabel create label function use to create label 
     * @param {object} req 
     */
    createLabel(req){
        logger.info("datat in model....",req.label );
        return new Promise((resolve, reject) => {
            const labelData = new label({
                "label": req.label,
                "userID": req.userID ,
                "noteId": req.noteId              
            })
            logger.info("data....",labelData);
            
            labelData.save()
                .then(data => {
                    logger.info(' sucessfully' , data.label);
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
     * @param {*} labelData 
     * @param {*} updateData  
     */
    
    updateOne(labelData, updateData) {
        return new Promise((resolve, reject) => {
            logger.info("update1",updateData)
            label.findOneAndUpdate(labelData,updateData)
            .then(data => {
                logger.info("model",data)
                resolve(data)
            })
                .catch(error => {
                    reject(error)
                })
        })
    }
/**
     * @function delete function use to delete label 
     * @param {object} deleteData 
     */
    delete(deleteData){
        return new Promise((resolve, reject) => {
            logger.info("update",deleteData)
            label.findOneAndDelete(deleteData)
            .then(data => {
                logger.info("model",data)
                resolve(data)
            })
                .catch(error => {
                    reject(error)
                })
        })
    }
/**
     * @function getAll function use to display all label 
     * @param {object} req 
     */

  //retriving all user details
  getAll(req) {
    return new Promise((resolve, reject) => {
        label.find({})
        .then(data => {
            resolve(data)
        })
            .catch(err => {
                reject(err)
            })
    })
}

}
module.exports=new Label()