'use strict';

const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

describe('/GET test', () => {
  it('it should get a message', (done) => {
    chai.request(server)
      .get('/api/v1/test')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('string');
        res.body.length.should.be.eql(0);
      });

      done();
  });
});
