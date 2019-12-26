/**
 * @constant mongoose object module 
 */
const mongoose=require('    ');
require('dotenv/config')
mongoose.Promise= globle.Promise;
//conecting to database
class database{
    constructor(){
        this.mogoose = mongoose;
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
            console.log("trying to enstablish a connection to mongo");
            
        });
        this.mongoose.connection.on('connected',function(){
            console.log("connection enstablish sucessesfully");
            
        });
        this.mongoose.connection.on('error',function(){
            console.log("Connection to mongo failed",+error);
            
        });
        this.mongoose.connection.on('disconnected',function(){
            console.log("mongo db connection closed");
            
        });
    }
    
}