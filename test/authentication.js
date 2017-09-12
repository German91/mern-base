'use strict';

const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

describe('/POST signup', () => {
  it('it should create an user', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        email: 'example@example.com',
        password: 'example',
        username: 'example'
      })
      .end((err, res) => {
        res.should.have.status(202);
        res.should.have.header('Authorization');
      });

      done();
  });
});
