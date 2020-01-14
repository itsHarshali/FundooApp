let userModel = require('../app/models/user')
const bcrypt = require('bcrypt')


class Services {

    userRegistration(req) {
        try {
            return new Promise((resolve, reject) => {
                userModel.findOne(req).then((data) => {
                    console.log("data in serv", data);

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
                        console.log("error in service");
                        reject(err)
                    })
            })

        } catch (error) {
            console.log(error);
        }
    }


    userLogin(loginData) {

        return new Promise((resolve, reject) => {
            userModel.findOne({ "emailid": loginData.emailid })
                .then((data) => {
                    console.log("data in services", data);

                    if (data !== null) {
                        // console.log("-----------",data.isVerified);

                        // userModel.findOne({"isVerified": data.isVerified})
                        // .then(data=>{
                        if (data.isVerified === true) {
                           bcrypt.compare(loginData.password, data.password)
                
                            
                                .then((element) => {
                                    console.log("....service",element);
                                    
                                    if (element) {
                                        resolve(data)
                                    }
                                    else {
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
                    // console.log("error in service");
                    reject(err)
                })
        })

    }

    // encrptyPassword(password) {
    //     return new Promise((resolve, reject) => {
    //         bcrypt.hash(password, 10).then((data) => {
    //             resolve(data)
    //         })
    //             .catch(err => {
    //                 reject(err)
    //             })
    //     })
    // }

    // userLogin(loginData) {
    //     return new Promise((resolve, reject) => {
    //         this.encrptyPassword(loginData.password).then((encryptedPassword) => {
    //             console.log("after enc services", encryptedPassword);
    //         userModel.findOne({ "emailid": loginData.emailid })
    //             .then((data) => {
    //                 console.log("data in services", data);
    //                 if (data !== null) {
    //                     // console.log("-----------",data.isVerified);

    //                     // userModel.findOne({"isVerified": data.isVerified})
    //                     // .then(data=>{
    //                     if (data.isVerified === true) {
    //                         bcrypt.compare(encryptedPassword, data.password)
    //                             .then((data) => {
    //                                 if (data) {
    //                                     resolve(data)
    //                                 }
    //                                 else {
    //                                     reject(err)
    //                                 }
    //                             })
    //                     } else {
    //                         reject(" you need check your email and verify first ");

    //                     }
    //                     // })
    //                 }
    //                 else if (data === null) {
    //                     reject("this email id is not registered... ");

    //                 }

    //             })
    //         })
    //             .catch(err => {
    //                 // console.log("error in service");
    //                 reject(err)
    //             })
            
    //     })

    // }


    forgetPasswordService(loginData) {
        try {
            //const response ={}
            return new Promise((resolve, reject) => {
                userModel.findOne({ "emailid": request.emailid })
                .then((data) => {
                    console.log("/////",data);

                    console.log('your email matched');

                    resolve(data)

                })
                    .catch(err => {
                        console.log("your Email not matched")
                        // response.success = false;
                        // response.message = "your Email not matched";
                        reject(err);

                    })
            })
        }
        catch (err) {
            console.log(err);
        }
    }
    resetPasswordService(request) {
        try {
            console.log("in services");
            return new Promise((resolve, reject) => {
                //call model method for saving reset password details
                userModel.update(request).then((data) => {

                    //send data to controller callback function
                    console.log("services", data)
                    resolve(data)
                })

                    .catch(err => {
                        reject(err)
                    })
            })
        }
        catch (err) {
            console.log(err);
        }
    }

    urlShorteningServices(request, shortnerObject) {
        console.log("request-------------->", request);
        return new Promise((resolve, reject) => {
            userModel.findOne({ "emailid": request.emailid }).then(data => {
                // if (error) {
                //     reject(error)
                // }
                // else  {
                //     resolve(error)
                // }
                console.log("in service", data)
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
            //console.log("email verify");
            return new Promise((resolve, reject) => {
                //call model method for saving reset password details
                userModel.updateOne({ "_id": request.id }, { "isVerified": true })
                    .then(data => {

                        //send data to controller callback function
                        console.log(" data in services", data)
                        resolve(data)
                    })

                    .catch(err => {
                        console.log("error in services", err);

                        reject(err)
                    })
            })
        }
        catch (err) {
            console.log(err);
        }
    }

    image(request) {
        try {
            //console.log("email verify");
            return new Promise((resolve, reject) => {
                //call model method for saving reset password details
                userModel.updateOne({ "_id": request._id }, { "imageUrl": request.imageUrl })
                    .then(data => {

                        //send data to controller callback function
                        console.log(" data in services", data)
                        resolve(data)
                    })

                    .catch(err => {
                        console.log("error in services", err);

                        reject(err)
                    })
            })
        }
        catch (err) {
            console.log(err);
        }
    }


}

module.exports = new Services();
