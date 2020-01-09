
let dataObject=require('../utility/test.json')
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
const should = chai.should();


chai.use(chaiHttp);

 /*
  * createNote API testing 
  */


  describe('create label API testing', () => {
      it('it should not create label,', (done) => {
        chai.request(server)
            .post('/label')
            .set('token',dataObject.verifyToken[0].token)
            .send(dataObject.createLabel[0])
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('Object');          
              done();
            });
      });
 
  it('it should  label ',(done) => {
    chai.request(server)
        .post('/label')
        .set('token',dataObject.verifyToken[0].token)
        .send(dataObject.createLabel[1])
        .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('Object');          
          done();
        });
  });

  it('it should create label successfully', (done) => {
    chai.request(server)
        .post('/label')
        .set('token',dataObject.verifyToken[2].token)
        .send(dataObject.createLabel[2])
        .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('Object');          
          done();
        });
  });
  it('it should create label successfully', (done) => {
    chai.request(server)
        .post('/label')
        .set('token',dataObject.verifyToken[0].token)
        .send(dataObject.createLabel[0])
        .end((err, res) => {
              res.should.have.status(422);
              res.body.should.be.a('Object');          
          done();
        });
  });
});
