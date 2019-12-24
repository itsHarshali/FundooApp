const mongoose = require('mongoose');
const TokenGenerator = require('../../utility/TokenGeneration.js');
const bcrypt = require('bcrypt')

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    emailid: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    longUrl: {
        type: String,
        default: null
    },
    shortUrl: {
        type: String,
        default: null
    },
    urlCode: {
        type: String,
        default: null
    },
    isVerified: {
        type: Boolean,
        default: false
    }
},

    {
        timestamps: true
    });


let user = mongoose.model('User', UserSchema);


function encrptyPassword(password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10).then((data) => {
            resolve(data)
        })
            .catch(err => {
                reject(err)
            })
    })
}
class Model {

    createUser(req) {
        return new Promise((resolve, reject) => {
            encrptyPassword(req.password).then((encryptedPassword) => {
                console.log("\n\n\tAfter encryption Password :" + encryptedPassword);
                // convert data object into json format to save into schema
                let userData = new user({
                    "firstName": req.firstName,
                    "lastName": req.lastName,
                    "password": encryptedPassword,
                    "emailid": req.emailid
                })
                userData.save().then(data => {
                    console.log('Registration successful ', data.firstName);
                    resolve(data)
                })
                    .catch(err => {
                        reject(err)
                    })
            })
                .catch((error) => {
                    reject(error)
                })
        })
    }

    update(req) {
       
            console.log("req", req.body);
            var response = {}
            return new Promise((resolve, reject) => {
                encrptyPassword(req.password).then((encryptedPassword) => {

                    console.log('req.id');
                    user.findOneAndUpdate({ '_id': req.id },
                        { 'password': encryptedPassword }
                        , (err, success) => {
                            if (err) {
                                reject(err + " update password error")
                            }
                            else {
                                console.log('Changed password succesfully');
                                console.log("in model", success)
                                response.success = true;
                                response.message = 'Changed password succesfully';
                                resolve(response);
                            }
                        })

                })

                    .catch((error) => {
                        reject(error)
                    })
            })
    }


    findOne(finddata) {
        return new Promise((resolve, reject) => {
            user.findOne({ "emailid": finddata.emailid }).then(data => {
                //console.log("Email id  not found ", data);
                resolve(data)
            })
                .catch(err => {
                    //console.log("Email id found ", data);
                    reject(err)
                })
        })
    }

    updateOne(request, dataUpdate) {
        console.log("data",request) //id print etc
        return new Promise((resolve, reject) => {
            console.log("update",dataUpdate)
            user.findOneAndUpdate(request,dataUpdate).then(data => {
                console.log("model",data)
                resolve(data)
            })
                .catch(error => {
                    reject(error)
                })
        })
    }

}

module.exports = { Model }

