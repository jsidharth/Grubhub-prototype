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
        token = jwt.sign({ id: 1 }, 'jwt-secret');
    })
    it('Should have valid restaurant details for valid owner account', function(done){
        agent.get(`/restaurant/1`)
            .set('Authorization', `JWT ${token}`)
            .then(function(res){
                expect(res.body.name).to.equal('Sidharth Restaurants');
                expect(res.body.zipcode).to.equal(95113);
                done();
            });
    });

    it('Should display blank result for owner account with no hotels', function(done){
        agent.get(`/restaurant/10`)
            .set('Authorization', `JWT ${token}`)
            .then(function(res){
                expect(res.status).to.equal(200);
                expect(res.body).to.empty;
                done();
            }).catch(err => {
                console.log(err);
            })
    });
})