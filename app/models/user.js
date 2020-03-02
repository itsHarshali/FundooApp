const mongoose = require('mongoose');
const TokenGenerator = require('../../utility/TokenGeneration.js');
const bcrypt = require('bcrypt')
const logger = require('../../config/winston.js')
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
    },
    imageUrl: {
        type: String,
        default: null
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
            encrptyPassword(req.password)
                .then((encryptedPassword) => {
                    logger.info("\n\n\tAfter encryption Password : " + encryptedPassword);
                    // convert data object into json format to save into schema
                    let userData = new user({
                        "firstName": req.firstName,
                        "lastName": req.lastName,
                        "password": encryptedPassword,
                        "emailid": req.emailid,
                        "isVerified": false
                    })
                    userData.save()
                        .then(data => {
                            logger.info('Registration successful ', data.firstName);
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
        logger.info("req", req.body);
        var response = {}
        return new Promise((resolve, reject) => {
            encrptyPassword(req.password)
                .then((encryptedPassword) => {
                    logger.info('req.id');
                    user.findOneAndUpdate({ '_id': req.id },
                        { 'password': encryptedPassword },
                        { new: true }, (err, success) => {
                            if (err) {
                                reject(err + " update password error")
                            }
                            else {
                                logger.info('Changed password succesfully');
                                logger.info("in model", success)
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
        logger.info("find data", finddata);
        return new Promise((resolve, reject) => {
            // logger.info("...");
            user.findOne(finddata)
                .then(data => {
                    logger.info("Email id  found ", data);
                    resolve(data)
                })
                .catch(err => {
                    //logger.info("Email id not found ");
                    reject(err)
                })
        })
    }

    updateOne(request, dataUpdate) {
        //logger.info("data",request) //id print etc
        return new Promise((resolve, reject) => {
            logger.info("update", dataUpdate)
            user.findOneAndUpdate(request, dataUpdate, { new: true })
                .then(data => {
                    logger.info("model", data)
                    resolve(data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
    getAll(request) {
        return new Promise((resolve, reject) => {
            user.find({})
                .then(data => {
                    logger.info("data1111", data)
                    resolve(data)
                })
                .catch(err => {
                    logger.info("data22", data)
                    reject(err)
                })
        })
    }
}

module.exports = new Model()

