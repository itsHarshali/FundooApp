
const jwtTokenGenerator = require('../utility/TokenGeneration');
let service =require('../services/label');
//const logger = require('../config/winston')
require('express-validator');
class labelController{

    createLabel(req, res) {
        console.log("req.body.data._id---",req.body.data._id);
        
        let response = {}
        try {
            req.checkBody('label', 'please enter label name ').isLength({ min: 1 })
           // req.checkBody('label', 'you can add only 50 letters').isLength({ max: 50 })
            const errors = req.validationErrors();

            if (errors) {
                response.success = false
                response.error = errors
                return res.status(422).send(response)//The 422 (Unprocessable Entity) status code 
            }
            console.log("req.body---,", req.body);

            let data = {
                userID: req.body.data._id,
                label: req.body.label,
            }
            console.log("data ---",data);
            
           // return new Promise((resolve, reject) => {
                service.labelService(data)
                    .then(data => {
                        response.success = true
                        response.message = " label create sucessesfully"
                        response.data = data
                        return res.status(200).send(response)
                    })
                    .catch(errors => {
                        response.success = false
                        response.message = " label does not create "
                        response.error = errors

                      return res.status(422).send(response)

                    })
           // })
        }
        catch (error) {
            response.success = false
            response.message = " something wrong "
            response.error = errors           
            reject(res.status(500).send(response))
        }
    }
    /**
         * @function labelUpdate is a function use to Update  note  from database
         * @param {string} req 
         * @param {string} res 
         */
    labelUpdate(req, res) {
        let response = {}
        try{
        console.log("controller.....", req.body.data._id);       
        const data = {}       
            data._id = req.params.labelId,//req.param._id
            data.userID= req.body.data._id,
            data.label = req.body.label
console.log("data in control ", data);

        //return new Promise((resolve, reject) => {
            service.updateServices(data)
                .then(data => {
                    response.success = true
                    response.message = " note update sucessesfully"
                    response.data = data
                   return res.status(200).send(response)
                })
                .catch(errors => {
                    response.success = false
                    response.message = " note does not update "
                    response.error = errors
                   return res.status(422).send(response)

                })
       // })
    }
    catch (error) {
        response.success = false
        response.message = error           
        return res.status(500).send(response)
    }
    }

      /**
         * @function noteDelete is a function use to Delete  note  from database
         * @param {string} req 
         * @param {string} res 
         */
        labelDelete(req, res) {
            let response = {}
            try{
                const labelData = {}
                labelData._id = req.params.labelId,
                labelData.userID= req.body.data._id             
            return new Promise((resolve, reject) => {
                service.deleteServices(labelData)
                    .then(data => {
                        response.success = true
                        response.message = " label delete sucessesfully"
                        response.data = data
                        resolve(res.status(200).send(response))
                    })
                    .catch(errors => {
                        response.success = false
                        response.message = " label does not delete "
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
        allLabel(request, response) {
            let res = {}
            try{
            const data = {}
            data._id = request.body.data._id
            service.allLabel(data)
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
    

}
module.exports= new labelController()