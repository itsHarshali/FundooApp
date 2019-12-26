let userModel = require('../app/models/usermodel')
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
        try {

            return new Promise((resolve, reject) => {
                userModel.findOne(loginData).then((data) => {

                    if (data !== null) {
                        bcrypt.compare(loginData.password, data.password).then((data) => {
                            if (data) {
                                resolve(data)
                            }
                            else {
                                reject(err)
                            }
                        })
                            .catch(err => {
                                reject(err)
                            })
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

    forgetPasswordService(loginData) {
        try {
            //const response ={}
            return new Promise((resolve, reject) => {
                userModel.findOne(loginData).then((data) => {
                    console.log("/////", loginData);

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
        userModel.findOne({ "emailid": request.emailid }).then(data=>{
            // if (error) {
            //     reject(error)
            // }
            // else  {
            //     resolve(error)
            // }
            console.log("in service",data)
            if (data !== null){
                userModel.updateOne({ "_id": request.id }, { "longUrl": shortnerObject.longUrl, "shortUrl": shortnerObject.shortUrl, "urlCode": shortnerObject.urlCode }).then(data => {
                    resolve(data)
                })               

                    .catch(error=>{
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
            userModel.updateOne({ "_id": request.id }, { "longUrl": shortnerObject.longUrl})
            .then(data => {

                //send data to controller callback function
               // console.log("", data)
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


}

module.exports = new Services();
















