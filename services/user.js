let userModel = require('../app/models/user')
const bcrypt = require('bcrypt')
let logger = require('../config/winston.js')

class Services {

    userRegistration(req) {
        try {
            return new Promise((resolve, reject) => {
                userModel.findOne(req).then((data) => {
                    logger.info("data in serv", data);

                    if (data === null) {

                        userModel.createUser(req).then(data => {
                            resolve(data)
                        })
                            .catch(err => {
                                reject(err)
                            })
                    }
                    else if (data !== null) {
                        reject("Email allready present")
                    }
                })
                    .catch(err => {
                        logger.info("error in service");
                        reject(err)
                    })
            })

        } catch (error) {
            logger.info(error);
        }
    }


    userLogin(loginData) {

        return new Promise((resolve, reject) => {
            userModel.findOne({ "emailid": loginData.emailid })
                .then((data) => {
                    logger.info("data in services", data);

                    if (data !== null) {
                        // logger.info("-----------",data.isVerified);

                        // userModel.findOne({"isVerified": data.isVerified})
                        // .then(data=>{
                        if (data.isVerified === true) {
                            bcrypt.compare(loginData.password, data.password)


                                .then((element) => {
                                    // logger.info("....service", element);
                                    console.log("....service", element);


                                    if (element) {
                                        resolve(data)
                                    }
                                    else if (err) {
                                        reject(err)
                                    }
                                })
                        } else {
                            reject(" you need check your email and verify first ");

                        }
                        // })
                    }
                    else if (data === null) {
                        reject("this email id is not registered... ");

                    }

                })
                .catch(err => {
                    // logger.info("error in service");
                    reject(err)
                })
        })

    }

  
    forgetPasswordService(request) {
        try {
            //const response ={}
            return new Promise((resolve, reject) => {
                userModel.findOne({ "emailid": request.emailid })
                    .then((data) => {
                        // logger.info("/////", data);

                        // logger.info('your email matched');

                        resolve(data)

                    })
                    .catch(err => {
                        logger.info("your Email not matched")
                        // response.success = false;
                        // response.message = "your Email not matched";
                        reject(err);

                    })
            })
        }
        catch (err) {
            logger.info(err);
        }
    }
    resetPasswordService(request) {
        try {
            logger.info("in services");
            return new Promise((resolve, reject) => {
                //call model method for saving reset password details
                userModel.update(request).then((data) => {

                    //send data to controller callback function
                    // logger.info("services", data)
                    resolve(data)
                })

                    .catch(err => {
                        reject(err)
                    })
            })
        }
        catch (err) {
            logger.info(err);
        }
    }

    urlShorteningServices(request, shortnerObject) {
        // logger.info("request-------------->", request);
        return new Promise((resolve, reject) => {
            userModel.findOne({ "emailid": request.emailid }).then(data => {
                logger.info("in service", data)
                if (data !== null) {
                    userModel.updateOne({ "_id": request.id },
                        {
                            "longUrl": shortnerObject.longUrl,
                            "shortUrl": shortnerObject.shortUrl,
                            "urlCode": shortnerObject.urlCode
                        })
                        .then(data => {
                            resolve(data)
                        })

                        .catch(error => {
                            reject(error)

                        })
                }
            })
        })
    }


    emailVerified(request) {
        try {
            //logger.info("email verify");
            return new Promise((resolve, reject) => {
                //call model method for saving reset password details
                userModel.updateOne({ "_id": request.id }, { "isVerified": true })
                    .then(data => {
                        //send data to controller callback function
                        // logger.info(" data in services", data)
                        resolve(data)
                    })
                    .catch(err => {
                        // logger.info("error in services", err);
                        reject(err)
                    })
            })
        }
        catch (err) {
            logger.info(err);
        }
    }

    image(request) {
        try {
            //logger.info("email verify");
            return new Promise((resolve, reject) => {
                //call model method for saving reset password details
                userModel.updateOne({ "_id": request._id }, { "imageUrl": request.imageUrl })
                    .then(data => {
                        //send data to controller callback function
                        // logger.info(" data in services", data)
                        resolve(data)
                    })
                    .catch(err => {
                        // logger.info("error in services", err);
                        reject(err)
                    })
            })
        }
        catch (err) {
            logger.info(err);
        }
    }


    allUser(request) {
        return new Promise((resolve, reject) => {
            userModel.getAll(request)
                .then(data => {
                    resolve(data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

}
module.exports = new Services();
