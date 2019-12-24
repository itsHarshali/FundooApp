//During the test the env variable is set to test
//process.env.NODE_ENV = 'test';


let model = require('../app/models/usermodel');
let registerObject=require('../utility/test.json')
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
  describe('/Post register', () => {
      it('it should POST all the register', (done) => {
        chai.request(server)
            .post('/registration')
            .send(registerObject.register[0])
            .end((err, res) => {
                  res.should.have.status(500);
                  res.body.should.be.a('Object');
                 // res.body.length.should.be.eql(0);
              done();
            });
      });
      it('it should POST all the register', (done) => {
        chai.request(server)
            .post('/registration')
            .send(registerObject.register[1])
            .end((err, res) => {
                  res.should.have.status(422);
                  res.body.should.be.a('Object');
                 // res.body.length.should.be.eql(0);
              done();
            });
      });
      it('it should POST all the register', (done) => {
        chai.request(server)
            .post('/registration')
            .send(registerObject.register[2])
            .end((err, res) => {
                  res.should.have.status(500);
                  res.body.should.be.a('Object');
                 // res.body.length.should.be.eql(0);
              done();
            });
      });
      it('it should POST all the register', (done) => {
        chai.request(server)
            .post('/registration')
            .send(registerObject.register[3])
            .end((err, res) => {
                  res.should.have.status(500);
                  res.body.should.be.a('Object');
                 // res.body.length.should.be.eql(0);
              done();
            });
      });
  });

// });