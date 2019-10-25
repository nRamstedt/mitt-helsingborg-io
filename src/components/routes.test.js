/* eslint-disable no-unused-expressions */
require('dotenv').config({ path: './.env.test' });
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

const should = chai.should();
chai.use(chaiHttp);

describe('Routes', () => {
  after(async () => {
    server.close();
  });

  it('should return json basic response on GET', async () =>
    chai
      .request(server)
      .get('/api/v1')
      .send()
      .then(res => {
        res.should.have.status(200);
        res.should.be.json;
        should.exist(res.body);
        should.exist(res.body.jsonapi);
      }));
});
