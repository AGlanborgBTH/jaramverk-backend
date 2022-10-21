process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const server = require('../src/app');

chai.should();

chai.use(chaiHttp);

const database = require('../src/db/database');

describe('Email', () => {
    let db;

    before('task', async () => {
        db = await database.getDb("docs");
    });

    after('task', async () => {
        db.collection.drop();

        db.client.close();
    });

    describe('Successfuly send email to temp-email', () => {
        const payload = { email: 'testEmail@test.com' };
        const secret = process.env.JWT_SECRET;
        const token = jwt.sign(payload, secret, { expiresIn: '1h' });
        const user = {
            to: "wavomej958@corylan.com",
            from: "testEmail@test.com"
        }

        it('GET status 401', (done) => {
            chai.request(server)
                .post("/email")
                .set("x-access-token", token)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.an("object");
                    res.body.should.have.property("data")
                    res.body.data.should.have.property("msg")
                    res.body.data.msg.should.equal("Got a POST request, sending back 201: Sent Email")

                    done();
                });
        });
    });

    it('Failed email-request w/o user-details', (done) => {
        const payload = { email: 'testEmail@test.com' };
        const secret = process.env.JWT_SECRET;
        const token = jwt.sign(payload, secret, { expiresIn: '1h' });

        chai.request(server)
            .post("/email")
            .set("x-access-token", token)
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.an("object");
                res.body.should.have.property("errors");
                res.body.errors.should.be.an("object");
                res.body.errors.should.have.property("status");
                res.body.errors.status.should.be.equal(500);
                res.body.errors.should.have.property("source");
                res.body.errors.source.should.be.equal("/email");
                res.body.errors.should.have.property("title");
                res.body.errors.title.should.be.equal("Error");
                res.body.errors.should.have.property("detail");
                res.body.errors.detail.should.be.equal("Empty POST request");

                done();
            });
    });

    it('Failed email-request w/o password', (done) => {
        const payload = { email: 'testEmail@test.com' };
        const secret = process.env.JWT_SECRET;
        const token = jwt.sign(payload, secret, { expiresIn: '1h' });
        const user = {
            to: "testEmail@test.com",
            from: ""
        }

        chai.request(server)
            .post("/email")
            .set("x-access-token", token)
            .send(user)
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.an("object");
                res.body.should.have.property("errors");
                res.body.errors.should.be.an("object");
                res.body.errors.should.have.property("status");
                res.body.errors.status.should.be.equal(500);
                res.body.errors.should.have.property("source");
                res.body.errors.source.should.be.equal("/email");
                res.body.errors.should.have.property("title");
                res.body.errors.title.should.be.equal("Error");
                res.body.errors.should.have.property("detail");
                res.body.errors.detail.should.be.equal("Missing to-email or from-email");

                done();
            });
    });

    it('Failed email-request w/o email', (done) => {
        const payload = { email: 'testEmail@test.com' };
        const secret = process.env.JWT_SECRET;
        const token = jwt.sign(payload, secret, { expiresIn: '1h' });
        const user = {
            to: "",
            from: "test"
        }

        chai.request(server)
            .post("/email")
            .set("x-access-token", token)
            .send(user)
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.an("object");
                res.body.should.have.property("errors");
                res.body.errors.should.be.an("object");
                res.body.errors.should.have.property("status");
                res.body.errors.status.should.be.equal(500);
                res.body.errors.should.have.property("source");
                res.body.errors.source.should.be.equal("/email");
                res.body.errors.should.have.property("title");
                res.body.errors.title.should.be.equal("Error");
                res.body.errors.should.have.property("detail");
                res.body.errors.detail.should.be.equal("Missing to-email or from-email");

                done();
            });
    });
});