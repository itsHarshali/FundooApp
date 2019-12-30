//During the test the env variable is set to test
//process.env.NODE_ENV = 'test';


let model = require('../app/models/usermodel');
let noteObject=require('../utility/test.json')
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);

/*
  * Test the /POST route
  */
  describe('/Post register', () => {
      it('it should create note', (done) => {
        chai.request(server)
            .post('/createNote')
            .send(noteObject.createNote[0])
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('Object');
                 // res.body.length.should.be.eql(0);
              done();
            });
      });
      it('it should create note', (done) => {
        chai.request(server)
            .post('/createNote')
            .send(noteObject.createNote[1])
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('Object');
                 // res.body.length.should.be.eql(0);
              done();
            });
      });
      it('it should create note', (done) => {
        chai.request(server)
            .post('/createNote')
            .send(noteObject.createNote[2])
            .end((err, res) => {
                  res.should.have.status(422);
                  res.body.should.be.a('Object');
                 // res.body.length.should.be.eql(0);
              done();
            });
      });
      it('it should CREATE NOTE', (done) => {
        chai.request(server)
            .post('/createNote')
            .send(noteObject.createNote[3])
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('Object');
                 // res.body.length.should.be.eql(0);
              done();
            });
      });
  });

// });