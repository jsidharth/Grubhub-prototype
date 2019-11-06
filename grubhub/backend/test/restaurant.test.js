var assert = require('chai').assert;
var app = require('../src/app');
var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;
var agent = require('chai').request.agent(app);
//var jwtSecret =  require("./../config/jwtConfig").secret;
var jwt = require("jsonwebtoken");

describe('GET restaurant details', function() {
    let token;
    before('Set token', function() {
        token = jwt.sign({ id: '5da8b692cd09720dfd278981' }, 'jwt-secret');
    })
    it('Should have valid restaurant details for valid owner account', function(done){
        agent.get(`/restaurant/5da8f7919157851bae62566a`)
            .set('Authorization', `JWT ${token}`)
            .then(function(res){
                expect(res.body.name).to.equal('Dominos');
                expect(res.body.zipcode).to.equal(951123);
                done();
            }).catch(done())
    });
})