var assert = require('chai').assert;
var app = require('../src/app');
var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;
var agent = require('chai').request.agent(app);
var jwt = require("jsonwebtoken");

describe('GET Order details', function() {
    let token;
    before('Set token', function() {
        token = jwt.sign({ id: 1 }, 'jwt-secret');
    })
    it('Should have valid order details for valid order id', function(done){
        agent.get(`/order/1`)
            .set('Authorization', `JWT ${token}`)
            .then(function(res){
                expect(res.status).to.equal(200);
                expect(res.body.amount).to.equal(24);
                expect(res.body.id).to.equal(1);
                done();
            });
    });

    it('Should display error message for invalid order id', function(done){
        agent.get(`/order/-1`)
            .set('Authorization', `JWT ${token}`)
            .then(function(res){
                expect(res.status).to.equal(500);
                expect(res.body.message).to.equal('Order not found!');
                done();
            });
    });
})