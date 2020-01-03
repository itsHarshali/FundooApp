
let jwt = require('jsonwebtoken');
require('dotenv').config();
const redis= require('redis')
const userModel = require('../app/models/user')
// create and connect redis client to local instance.
const client = redis.createClient(`${process.env.REDIS_PORT}`);

// Print redis connect to the console
client.on('connect', () => {
    console.log("redis connected on port ", `${process.env.REDIS_PORT}`);
  });



module.exports = {
    generateToken(payload) {
        console.log("2", JSON.stringify(payload))
        let token = jwt.sign(payload, "privateKey");
        // ,{
        //     expiresIn:'24h'      //expires in 24 hours
        // });

        let object = {
            success: true,
            token: token
        }

        console.log(object)
        return object;
    },

    verifyToken(req, res, next) {
        let token = req.header('token')//||req.params.url
        console.log(" token after vread", token);

        if (token) {
            jwt.verify(token, 'privateKey', function (err, decoded) {
                console.log(" token in ", token);

                // console.log("tkg",data);
                if (err) {
                    return res.status(400).send(err + "Token has expired")
                }
                else {
                    console.log("token", JSON.stringify(decoded));
                    req.body['data'] = decoded

                    req.token = decoded; 
                    client.get('Token'+ decoded._id,(error,data)=>{
                        if(error){
                            console.log("error occured genrating redixtoken")
                        }
                        else if ( data === token){
                            console.log( "cache data and token found equal",data);
                            next();  
                        }
                       
                    })

                }
            })
            // return the req.decoded;
        }
        else {
            res.status(400).send('Token not received')
        }
    },

    emailVerification(req, res, next) {
        let urlCode = req.params.urlCode
        console.log("req.params.urlCode---->", urlCode);
        return new Promise((resolve, reject) => {
            userModel.findOne({ 'urlCode': urlCode }).then((data) => {
                const longUrl = data.longUrl.split('http://localhost:8081/isEmailVerified/');
                const Token = longUrl[1];
                if (token) {
                    jwt.verify(token, 'privateKey', (err, decoded) => {
                        console.log(" token in ", token);

                        // console.log("tkg",data);
                        if (err) {
                            return res.status(400).send(err + "Token has expired")
                        }
                        else {
                            console.log("token", JSON.stringify(decoded));
                            req.body['data'] = decoded

                            req.token = decoded;
                            next();
                        }
                    })
                    // return the req.decoded;
                }
                else {
                    res.status(400).send('Token not received')
                }
            })
                .catch((error) => {
                    console.log(error);
                    reject(res.status(404).send('Token not received'))

                })
        })
    }
}


