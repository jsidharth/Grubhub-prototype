var assert = require('chai').assert;
var app = require('../src/app');
var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;
var agent = require('chai').request.agent(app);
var jwt = require("jsonwebtoken");

describe('GET item details', function() {
    let token;
    before('Set token', function() {
        token = jwt.sign({ id: '5da8b692cd09720dfd278981' }, 'jwt-secret');
    })
    it('Should have valid item details for valid item id', function(done){
        agent.get(`/item/5dc0870d9409f303d456aaba`)
            .set('Authorization', `JWT ${token}`)
            .then(function(res){
                expect(res.status).to.equal(200);
                expect(res.body.rate).to.equal(5);
                expect(res.body.name).to.equal('Waffles');
                done();
            }).catch(done());
    });

    it('Should display error message for invalid item id', function(done){
        agent.get(`/item/5dbd47b3076cc17d13998800`)
            .set('Authorization', `JWT ${token}`)
            .then(function(res){
                expect(res.status).to.equal(500);
                expect(res.body.message).to.equal('Item not found!');
                done();
            }).catch(done());
    });
})