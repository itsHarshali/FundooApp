
let noteObject=require('../utility/test.json')
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
const should = chai.should();


chai.use(chaiHttp);

 /*
  * createNote API testing 
  */


  describe('createNote API testing', () => {
      it('it should not create note,enter password', (done) => {
        chai.request(server)
            .post('/notes')
            .set('token',noteObject.verifyToken[0].token)
            .send(noteObject.createNote[0])
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('Object');          
              done();
            });
      });
 
  it('it should create note ', (done) => {
    chai.request(server)
        .post('/notes')
        .set('token',noteObject.verifyToken[1].token)
        .send(noteObject.createNote[0])
        .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('Object');          
          done();
        });
  });

  it('it should create note successfully', (done) => {
    chai.request(server)
        .post('/notes')
        .set('token',noteObject.verifyToken[2].token)
        .send(noteObject.createNote[0])
        .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('Object');          
          done();
        });
  });
  it('it should create note successfully', (done) => {
    chai.request(server)
        .post('/notes')
        .set('token',noteObject.verifyToken[0].token)
        .send(noteObject.createNote[2])
        .end((err, res) => {
              res.should.have.status(422);
              res.body.should.be.a('Object');          
          done();
        });
  });
});

 /*
  * deleteNote API testing 
  */
  describe('DeleteNote API testing', () => {


      it('it should delete note successfully', (done) => {
        chai.request(server)
            .delete('/notes/'+noteObject.noteId[0].noteId)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('Object');          
              done();
            });
      });
 
      it('it should delete note successfully', (done) => {
        chai.request(server)
             .delete('/notes/'+noteObject.noteId[1].noteId)            
            //.send(noteObject.createNote[0])
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('Object');          
              done();
            });
      });
  
      it('does not get noteID', (done) => {
        chai.request(server)
             .delete('/notes/'+noteObject.noteId[2].noteId)           
            //.send(noteObject.createNote[0])
            .end((err, res) => {
                  res.should.have.status(404);
                  res.body.should.be.a('Object');          
              done();
            });
      });
      it('it should delete note successfullyy', (done) => {
        chai.request(server)
            .delete('/notes/'+noteObject.noteId[3].noteId)
            .end((err, res) => {
                  res.should.have.status(422);
                  res.body.should.be.a('Object');          
              done();
            });
      });
      
      it('it should delete note successfully', (done) => {
        chai.request(server)
           .delete('/notes/'+noteObject.noteId[0].noteId)        
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('Object');          
              done();
            });
      });
  
      it('does not get noteID', (done) => {
        chai.request(server)
          .delete('/notes/'+noteObject.noteId[2].noteId)      
            .end((err, res) => {
                  res.should.have.status(404);
                  res.body.should.be.a('Object');          
              done();
            });
      });
      it('it should delete note successfully', (done) => {
        chai.request(server)
            .delete('/notes/'+noteObject.noteId[0].noteId )         
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('Object');          
              done();
            });
      });

});


  describe('get allNotes API testing', () => {
      it('it should get all note successfully', (done) => {
        chai.request(server)
            .get('/notes')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('Object');          
              done();
            });
      });
 
    });

    describe('get allNotes Sequence API testing', () => {
      it('it should get note Sequence  successfully', (done) => {
        chai.request(server)
            .get('/noteSequence')
             .set('token',noteObject.verifyToken[0].token)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('Object');          
              done();
            });
      });
 
    });



    describe('get allNotes trash API testing', () => {
      it('it should get all note trash  successfully', (done) => {
        chai.request(server)
            .get('/trash')
             .set('token',noteObject.verifyToken[0].token)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('Object');          
              done();
            });
      });
 
    });

  describe('restore Trash API testing', () => {
 it('it should restore Trash note successfully', (done) => {
        chai.request(server)
            .put('/trash/'+noteObject.noteId[0].noteId)
            .end((err, res) => {
                  res.should.have.status(422);
                  res.body.should.be.a('Object');          
              done();
            });
      });
 
      it('it should  restore Trash note successfully', (done) => {
        chai.request(server)
             .put('/trash/'+noteObject.noteId[1].noteId)
            
            //.send(noteObject.createNote[0])
            .end((err, res) => {
                  res.should.have.status(422);
                  res.body.should.be.a('Object');          
              done();
            });
      });
  
      it('does not get noteID', (done) => {
        chai.request(server)
             .put('/trash/'+noteObject.noteId[2].noteId)
            
            //.send(noteObject.createNote[0])
            .end((err, res) => {
                  res.should.have.status(404);
                  res.body.should.be.a('Object');          
              done();
            });
      });
      it('it should delete note successfullyy', (done) => {
        chai.request(server)
            .put('/trash/'+noteObject.noteId[3].noteId)
            
            //.send(noteObject.createNote[0])
            .end((err, res) => {
                  res.should.have.status(422);
                  res.body.should.be.a('Object');          
              done();
            });
      });
});

//************************************ */

// describe('/Post isArchive note', () => {
//       it('it should isArchive note successfully', (done) => {
//         chai.request(server)
//             .put('/isArchive/'+noteObject.noteId[0].noteId)
//             .end((err, res) => {
//                   res.should.have.status(302);
//                   res.body.should.be.a('Object');          
//               done();
//             });
//       });


//       it('it should isArchive note successfully', (done) => {
//         chai.request(server)
//             .put('/isArchive/'+noteObject.noteId[1].noteId)
//             .end((err, res) => {
//                   res.should.have.status(302);
//                   res.body.should.be.a('Object');          
//               done();
//             });
//       });
//       it('it should undefined note Id', (done) => {
//         chai.request(server)
//             .put('/isArchive/'+noteObject.noteId[2].noteId)
//             .end((err, res) => {
//                   res.should.have.status(302);
//                   res.body.should.be.a('Object');          
//               done();
//             });
//       });
//       it('it should data undefined', (done) => {
//         chai.request(server)
//             .put('/isArchive/'+noteObject.noteId[3].noteId)
//             .end((err, res) => {
//                   res.should.have.status(302);
//                   res.body.should.be.a('Object');          
//               done();
//             });
//       });
// });



