//During the test the env variable is set to test
//process.env.NODE_ENV = 'test';


let model = require('../app/models/usermodel');
let loginObject=require('../utility/test.json')
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);
// //Our parent block
// describe('Books', () => {
//     beforeEach((done) => { //Before each test we empty the database
//         Book.remove({}, (err) => { 
//            done();           
//         });        
//     });
/*
  * Test the /POST route
  */
  describe('/Post login', () => {
      it('it should POST all the login', (done) => {
        chai.request(server)
            .post('/login')
            .send(loginObject.login[0])
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('Object');
                 // res.body.length.should.be.eql(0);
              done();
            });
      });
    //   it('it should POST all the login', (done) => {
    //     chai.request(server)
    //         .post('/login')
    //         .send(loginObject.login[1])
    //         .end((err, res) => {
    //               res.should.have.status(200);
    //               res.body.should.be.a('Object');
    //              // res.body.length.should.be.eql(0);
    //           done();
    //         });
    //   });
      it('it should POST all the login', (done) => {
        chai.request(server)
            .post('/login')
            .send(loginObject.login[2])
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('Object');
                 // res.body.length.should.be.eql(0);
              done();
            });
      });
      it('it should POST all the login', (done) => {
        chai.request(server)
            .post('/login')
            .send(loginObject.login[3])
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('Object');
                 // res.body.length.should.be.eql(0);
              done();
            });
      });
  });

// });