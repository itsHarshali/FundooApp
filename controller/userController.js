
const jwtTokenGenerator = require('../utility/TokenGeneration');
const mailSender = require('../utility/mailSender');
let service = require('../services/userServices')
let validator = require('express-validator');
let Shortner =require('../utility/URLshortner')
// let service = new services.Services
let urlShortner = new Shortner.URL
class Controller {
/**
 * @function registration for user registr all data 
 * @param {*} req 
 * @param {*} res 
 */
    registration(req, res) {

        req.checkBody('firstName', 'firstName must be at least 3 chars long').isLength({ min: 3 }),
            req.checkBody('lastName', 'lastName must be at least 3 chars long').isAlpha()
        req.checkBody('emailid', 'Email Must be in email format').isEmail()
        //req.checkBody('emailid', 'Email Must be at least 30 chars long').isLength({ max: 30 })
        req.checkBody('password', 'Password Must be at least 8 chars long').isLength({ min: 8 }).isAlphanumeric()
        // req.checkBody('password', 'Password contain alphabetical chars and numbers')
        const errors = req.validationErrors();
        let response = {}
        if (errors) {
            response.success = false
            response.error = errors
            return res.status(422).send(response)
        }

        let registrationData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            emailid: req.body.emailid,
        }
      
            service.userRegistration(registrationData)
                .then(data => {
                    let payload = {
                        '_id': data._id,
                        'emailid': data.emailid
                    }
                    let jwtToken = jwtTokenGenerator.generateToken(payload);
                    console.log("token",jwtToken.token);
                    
                    let longUrl = 'http://localhost:8080/data/' + jwtToken.token;
                    urlShortner.urlShortner(data, longUrl).then(data => {
                        console.log("data",data)
                        //resolve(data)
                        return res.status(200).send(data);
                    })
                        .catch(error => {
                            response.error = error;
                           // reject(error)
                            return res.status(501).send(response);
                        })
                    response.success = true
                    resolve(data)
                    //console.log('DAtaaaaaaa :: ', data);

                    // return res.status(200).send({ message: data })
                })
                .catch(err => {
                    response.success = false
                    response.error = errors

                    reject(err)
                    return res.status(500).send({ message: err })
                })
        
    }



    login(req, res) {
        let response = {}
        req.checkBody('emailid', 'Email Must be in email format').isEmail()
        const errors = req.validationErrors();
        if (errors) {
            response.success = false
            response.error = errors
            return res.status(422).send(response)
        }

        else {

            const loginData = {}
            loginData.emailid = req.body.emailid,
                loginData.password = req.body.password

                service.userLogin(loginData).then(data => {

                    console.log("data", data);
                    response.success = true
                    response.message = "login succesfully"
                    response.data = data
               
                    return res.status(200).send(response);
                })
                    .catch(err => {
                        console.log("Somthing went wrong in user controller");
                        response.success = false
                        response.error = err
                     
                        return res.status(500).send(response)
                    })
        }
    }

    forgetPasswordController(request, response) {
        request.checkBody('emailid', 'Email Must be in email format').isEmail()
        request.checkBody('emailid', 'Email Must be at least 30 chars long').isLength({ max: 30 })

        let res = {};
        const error = request.validationErrors()
        if (error) {
            res.success = false;
            res.message = error[0].msg;
            res.error = error;
            console.log(res);
            return response.status(500).send(res);
        }
        else {
            let forgotObject = {
                emailid: request.body.emailid,
            }
            console.log("email id", forgotObject);

            
                //call userServices methods and pass the object
                service.forgetPasswordService(forgotObject).then(data => {
                    console.log("data in controller--> ", data)
                    let payload = {
                        '_id': data._id
                    }
                    let jwtToken = jwtTokenGenerator.generateToken(payload);
                    //data.token = token;
                    let url = 'http://localhost:8080/resetpassword/' + jwtToken.token;
                    // let url = 'http://localhost:8080/ResetPassword/'+jwtToken.token;
                    // var urlCode = urlShortner.shortUrl(url);
                    // let shortUrl = 'http://localhost:3000/#/resetpassword/' + urlCode;
                    mailSender.sendMail(data.emailid, url);
                    res.success = data.success,
                        res.message = "Link successfully sent to your Email"
                    // res.data = data
                  
                    return response.status(200).send({ res, token: jwtToken.token })
                })
                    .catch(err => {
                        console.log(err)
                        res.success = false,
                            res.message = "please chake your email"
                      
                        return response.status(500).send(res);

                    })
            
        }
    }
    resetPasswordController(request, response) {
        console.log("ctrl", request.body.data._id)
        request.checkBody('password', 'Cannot be empty').notEmpty();
        request.checkBody('password', 'Must be at least 8 chars long').isLength({ min: 8 })
        request.checkBody('password', 'Password contain alphabetical chars and numbers').isAlphanumeric()
        let res = {};
        const errors = request.validationErrors()
        if (errors) {
            console.log('err')
            res.success = false;
            res.message = errors[0].msg;
            res.error = errors;
            return response.status(500).send(res);
        }
        else {
            let resetObject = {
                password: request.body.password,
                id: request.body.data._id
            }
            console.log("pa", resetObject);
        
                //call userServices methods and pass the object
                service.resetPasswordService(resetObject).then(data => {
                    // res.success = data.success;
                    res.success = true;
                    res.data = data;
                    console.log("response in controller", data);

                    return response.status(200).send(res)
                })
                    .catch(err => {
                        res.success = false,
                            res.err = err                        
                        return response.status(500).send(res);
                    })
            
        }
    }

    urlShortnerController(request, shortenerObject) {
        try{
        return new Promise(resolve, reject => {
            var res = {};
            //let urlCode = urlShortner.generate(longUrl);
            //shortUrl='http://localhost:8080/data/' + urlCode;
            service.urlShorteningServices(request, shortenerObject)
            .then(data => {
                resolve(data)
              if (data === null) {
                    res.success = false
                    // return res.status(500).send(res);
                    resolve(res)
                }
                else {
                    res.success = true;
                    res.data = data;
                    // return res.status(200).send(res);
                    resolve(res)
                }
            })
                .catch(err => {
                    reject(err);
                })
        })
    }
    catch(error){
        return error
    }
    }


}


module.exports=new Controller();

