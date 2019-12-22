let model = require('../app/models/usermodel')
const bcrypt = require('bcrypt')
let userModel = new model.Model

class Services {

        userRegistration(req) {
            try {
                return new Promise((resolve, reject) => {
                    userModel.findOne(req).then((data)=> {
                            console.log("......",data)
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
                userModel.findOne(loginData).then((data)=> {
                        console.log("......",data)
                        if (data !== null) {
                            bcrypt.compare(loginData.password, data.password).then(( data) => {
                                if(data){
                                resolve(data)
                                }
                                else{ 
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
                userModel.findOne(loginData).then((data)=> {
            console.log("/////",loginData);
                
                    console.log('your email matched');
                   
                    resolve(data)

                })
                
            .catch(err=>{
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
            userModel.update(request).then((data)=> {
               
                    //send data to controller callback function
                    console.log("services", data)
                    resolve(data)
                
            })

            .catch(err=>{
                reject (err)
            })
        })
        }
        catch (err) {
            console.log(err);
        }
    }
    // resetPasswordService(request, callback) {
    //     try {
    //         console.log("in services");

    //         //call model method for saving reset password details
    //         userModel.resetPassword(request, (err, data) => {
    //             if (err) {
    //                 //send error to controller callback function
    //                 return callback(err)
    //             } else {
    //                 //send data to controller callback function
    //                 console.log("services", data)
    //                 return callback(null, data)
    //             }
    //         })
    //     }
    //     catch (err) {
    //         console.log(err);
    //     }
    // }

    // userDetailsService(request, callback) {
    //     try {
    //         //call model method for saving reset password details
    //         userModel.getAllUsers(request, (err, data) => {
    //             if (err) {
    //                 //send error to controller callback function
    //                 return callback(err)
    //             }
    //             else {

    //                 return callback(null, data)
    //             }
    //         })
    //     }
    //     catch (error) {
    //         console.log(error);
    //     }
    // }

}

module.exports = { Services }
















