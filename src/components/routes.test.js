/* eslint-disable no-unused-expressions */
require('dotenv').config({ path: './.env.test' });

const chai = require('chai');

const should = chai.should();

describe('Hello World', () => {
  it('True should be true', async () => {
    const truthfulVariable = true;
    truthfulVariable.should.equal(true);
  });
});
