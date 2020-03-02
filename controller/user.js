
const jwtTokenGenerator = require('../utility/TokenGeneration');
const mailSender = require('../utility/mailSender');
const logger =require('../config/winston.js')
let service = require('../services/user')
require('express-validator');
let Shortner = require('../utility/URLshortner')
const redis = require('redis')
require('dotenv').config();
const client = redis.createClient(`${process.env.REDIS_PORT}`);

// let service = new services.Services
let urlShortner = new Shortner.URL
class Controller {
    /**
     * @function registration for user registr all data 
     * @param {*} req 
     * @param {*} res 
     */
    registration(req, res) {
        try{
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
                logger.info("paylod",payload);
                
                let jwtToken = jwtTokenGenerator.generateToken(payload);
                logger.info("token", jwtToken.token);
                //redis set
                client.set('Token' + data._id, jwtToken.token)

                let longUrl = `${process.env.LONG_URL}` + jwtToken.token;
                urlShortner.urlShortner(data,longUrl).then(data => {
                    logger.info("data", data)
                    response.success = true
                    response.message = "Registration succesfully"
                    response.data = data
                    return res.status(200).send(response);
                })
                    .catch(error => {
                        response.error = error;
                        return res.status(501).send(response);
                    })
                response.success = true
                // return res.status(200).send({ message: data })
            })
            .catch(err => {
                response.success = false
                response.message = "Your already registered"
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

    login(req, res) {
        let response = {}
        try{
        req.checkBody('emailid', 'Email Must be in email format').isEmail()
        const errors = req.validationErrors();
        if (errors) {
            response.success = false
            response.error = errors
            return res.status(422).send(response)
        }

        else {
            logger.info("token");

            const loginData = {}

            loginData.emailid = req.body.emailid,
                loginData.password = req.body.password
            logger.info("login data");

            service.userLogin(loginData)
                .then(data => {
                    logger.info("_id ;",data);
                    
                    const payload = {
                        '_id': data._id,
                        'emailid': data.emailid
                    }
                    logger.info("paylod in user control",payload);
                    let jwtToken = jwtTokenGenerator.generateToken(payload);
                    logger.info("jwtToken", jwtToken);
                    client.set('Token' + data._id, jwtToken.token)
                    //logger.info("data", data);
                    response.success = true
                    response.message = "login succesfully"
                    response.token = jwtToken.token
                   response.data = data

                    return res.status(200).send(response);
                })
                .catch(err => {
                    logger.info("you need to first registare");
                    response.success = false
                    response.error = err

                    return res.status(422).send(response)
                })
        }
    }
    catch (error) {
        response.success = false
        response.message = error           
        reject(res.status(500).send(response))
    }
    }

    forgetPasswordController(request, response) {
        try{
        request.checkBody('emailid', 'Email Must be in email format').isEmail()
        request.checkBody('emailid', 'Email Must be at least 30 chars long').isLength({ max: 30 })

        let res = {};
        const error = request.validationErrors()
        if (error) {
            res.success = false;
            res.message = error[0].msg;
            res.error = error;
            logger.info(res);
            return response.status(422).send(res);
        }
        else {
            let forgotObject = {
                emailid: request.body.emailid,
                // id: request.body.data._id
            }
            logger.info("email id", forgotObject);
            //call userServices methods and pass the object
            service.forgetPasswordService(forgotObject).then(data => {
                logger.info("data in controller--> ", data)
                let payload = {
                    '_id': data._id
                }
                let jwtToken = jwtTokenGenerator.generateToken(payload);
                //data.token = token;
                client.set('Token' + data._id, jwtToken.token)
                let url = `${process.env.RESET_URL}` + jwtToken.token;
                mailSender.sendMail(data.emailid, url);
                res.success = data.success,
                    res.message = "Link successfully sent to your Email"
                // res.data = data

                return response.status(200).send({ res, token: jwtToken.token })
            })
                .catch(err => {
                    logger.info(err)
                    res.success = false,
                        res.message = "please chake your email"

                    return response.status(422).send(res);

                })
        }
          }
        catch (error) {
            response.success = false
            response.message = error           
            reject(res.status(500).send(response))
        }
    }

    resetPasswordController(request, response) {
        try{
        logger.info("ctrl", request.body.data._id)
        request.checkBody('password', 'Cannot be empty').notEmpty();
        request.checkBody('password', 'Must be at least 8 chars long').isLength({ min: 8 })
        request.checkBody('password', 'Password contain alphabetical chars and numbers').isAlphanumeric()
        let res = {};
        const errors = request.validationErrors()
        if (errors) {
            logger.info('err')
            res.success = false;
            res.message = errors[0].msg;
            res.error = errors;
            return response.status(422).send(res);
        }
        else {
            let resetObject = {
                password: request.body.password,
                id: request.body.data._id
            }
            //logger.info("pa", resetObject);

            //call userServices methods and pass the object
            service.resetPasswordService(resetObject).then(data => {
                // res.success = data.success;
                res.success = true;
                res.data = data;
                logger.info("response in controller", data);

                return response.status(200).send(res)
            })
                .catch(err => {
                    res.success = false,
                        res.err = err
                    return response.status(422).send(res);
                })

        }
    }
    catch (error) {
        response.success = false
        response.message = error           
        reject(res.status(500).send(response))
    }
    }

    urlShortnerController(request, shortenerObject) {
        try {
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
        catch (error) {
            return error
        }
    }
    isEmailVerified(req, res) {
        try{
        var objectdata = {
            id: req.body.data._id
        }
        logger.info("_id----->", req.body.data._id);
        const response = {}
        service.emailVerified(objectdata)
            .then(data => {
                logger.info("ssdfsassda", data);

                // response.success = data.success;
                response.success = true;
                response.data = data;
                // logger.info("response in controller", data);

                return res.status(302).send(response)
            })
            .catch(err => {
                logger.info("ERROR", err);

                response.success = false,
                response.err = err
                return res.status(422).send(response);
            })
        }
        catch (error) {
            response.success = false
            response.message = error           
            reject(res.status(500).send(response))
        }
    }

    addImage(req, res) {
        try{
        logger.info('req in controller', req);
        // logger.info('req in controller',req.params);

        // const  imageData={}
        //     imageData._id=req.params.userId
        //     imageData.imageUrl= req.file.location 
        let response = {}
        service.image(req).then(data => {

            logger.info("data", data);
            response.success = true
            response.message = "image save succesfully"
            response.data = data

            return res.status(200).send(response);
        })
            .catch(err => {
                logger.info(" somthing wrong to save image");
                response.success = false
                response.error = err

                return res.status(422).send(response)
            })
        }
        catch (error) {
            response.success = false
            response.message = error           
            reject(res.status(500).send(response))
        }
    }
    
    allUser(request, response) {
        let res = {}
        try{
      
        service.allUser(request)
            .then(data => {
                res.success = data.success;
                res.data = data;
                return response.status(200).send(res)
            })
            .catch(error => {
                logger.info(" somthing wrong ");

                res.success = false,
                    res.error = error
                return response.status(422).send(res)
            })
        }
        catch (error) {
            res.success = false
            res.message = error           
            return response.status(500).send(res)
        }
    }


}
module.exports = new Controller();

