/**
 * @constant mongoose object module 
 */
const logger =require('./winston.js')
const mongoose=require('mongoose');
require('dotenv/config')
// mongoose.Promise= globle.Promise;
mongoose.Promise = global.Promise;
//conecting to database
class database{
    constructor(){
        this.mongoose = mongoose;
        this.host = `${process.env.HOST}`;
        this.port =`${process.env.DB_PORT}`;
        this.userName= `${process.env.USSERNAME}`;
        this.password =`${process.env.PASSWORD}`;
        this.url =`${process.env.URL}`;
    }
    connect(){
        this.mongoose.connect(this.url,{
            connectTimeoutMS:1000,
            userNewurlParser:true
        })
        this.monitor();
        return this.mongoose;
    }
    monitor(){
        this.mongoose.connection.on('connecting',function(){
            logger.error("trying to enstablish a connection to mongo");
            
        });
        this.mongoose.connection.on('connected',function(){
            logger.info("connection enstablish sucessesfully");
            
        });
        this.mongoose.connection.on('error',function(){
            logger.error("Connection to mongo failed",+error);
            
        });
        this.mongoose.connection.on('disconnected',function(){
            logger.error("mongo db connection closed");
            
        });
    }    
}
module.exports= new database()