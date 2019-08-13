const supertest = require("supertest");
const should = require("should");

// This agent refers to PORT where program is runninng.
const server = supertest.agent("http://localhost:8080");

// UNIT test begin
describe("user route unit test",function(){
  let authHeaders = { "Authorization":"" };

  it("should signin user",function(done){
    //calling api
    server
    .post('/api/signin')
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      authHeaders.Authorization = `bearer ${res.body.token}`;
      done();
    });
  });
  
  it("should add user",function(done){
    //calling api
    server
    .post('/api/users')
    .set(authHeaders)
    .send({name: 'john'})
    .expect("Content-type",/json/)
    .expect(201)
    .end(function(err,res){
      res.status.should.equal(201);
      done();
    });
  });
  
  it("should get users",function(done){
    //calling api
    server
    .get('/api/users')
    .set(authHeaders)    
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      done();
    });
  })

  it("should give forbidden status for get users api",function(done){
    //calling api without token
    server
    .get('/api/users')
    .expect("Content-type",/json/)
    .expect(403)
    .end(function(err,res){
      res.status.should.equal(403);
      done();
    });
  });

});
