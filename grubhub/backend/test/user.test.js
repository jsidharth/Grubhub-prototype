//var Users = require('./../src/sequelize').Users;
var assert = require('chai').assert;
var app = require('../src/app');
var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;
var agent = require('chai').request.agent(app).keepOpen();


describe('GET User /getdetails', function() {
    it('Should have valid user details',function(done){
        agent.get(`/user/getdetails/5da8b692cd09720dfd278981`)
            .then(function(res){
                expect(res.body.first_name).to.equal('Sidharth');
                expect(res.body.last_name).to.equal('Jayaprakash');
                expect(res.body.email).to.equal('sidharthjayaprakash93@gmail.com');
                expect(res.body.type).to.equal('Owner');
                done();
            }).catch(done())
    });

    it('Should display error message for invalid user',function(done){
        agent.get(`/user/getdetails/5da8b692cd09720dfd278000`)
            .then(function(res){
                expect(res.body.message).to.equal('User not found');
                expect(res.status).to.equal(500);
                done();
            }).catch(done())
    });
});

describe('User Registration', function() {
    afterEach(function(done) {
        Users.destroy({
            where: {
                email: 'test@gmail.com'
            }
        });
        done();
    })
    it('Should have create a user when provided with valid details',function(done){
        agent.post(`/user/register`)
            .send({
                email: 'test@gmail.com',
                password: 'test',
                first_name: 'Testing',
                last_name: 'Testing',
                type: 'Owner'
            })
            .then(function(res){
                expect(res.body.email).to.equal('test@gmail.com');
                expect(res.body.first_name).to.equal('Testing');
                expect(res.body.last_name).to.equal('Testing');
                expect(res.body.type).to.equal('Owner');
                done();
            });
    });

})