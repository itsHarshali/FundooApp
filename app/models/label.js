const mongoose=require('mongoose');
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
        console.log("datat in model....",req.label );
        return new Promise((resolve, reject) => {
            const labelData = new label({
                "label": req.label,
                "userID": req.userID            
            })
            console.log("data....",labelData);
            
            labelData.save()
                .then(data => {
                    console.log('collaborate sucessfully' , data.label);
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
            console.log("update1",updateData)
            label.findOneAndUpdate(labelData,updateData)
            .then(data => {
                console.log("model",data)
                resolve(data)
            })
                .catch(error => {
                    reject(error)
                })
        })
    }

    delete(deleteData){
        return new Promise((resolve, reject) => {
            console.log("update",deleteData)
            label.findOneAndDelete(deleteData)
            .then(data => {
                console.log("model",data)
                resolve(data)
            })
                .catch(error => {
                    reject(error)
                })
        })
    }

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