const urlShortner = require('shortid')
const serviceObject = require('../services/userServices')
const mailSender = require('./mailSender')
// const controllerObject = new Controller()

class URL {


    urlShortner(data, longUrl) {
        console.log("in urlshortner utility",data);
        
        var urlCode = urlShortner.generate(longUrl);
        let shortUrl = 'http://localhost:8080/data/' + urlCode;
        let urlShortnerObject = {
            'longUrl': longUrl,
            'shortUrl': shortUrl,
            'urlCode': urlCode
        }
        console.log("obj",urlShortnerObject);
        
        return new Promise((resolve, reject) => {
            console.log("email",data);
            mailSender.sendMail(data.emailid, shortUrl)
                serviceObject.urlShorteningServices(data, urlShortnerObject).then(data => {
                    console.log("data in utikity",data);
                    
                    resolve(data)
                })
                    .catch(error => {
                        reject(error)
                    })

            })
 

        }
    
}
module.exports = { URL }