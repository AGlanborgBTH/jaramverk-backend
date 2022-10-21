process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/app');

chai.should();

chai.use(chaiHttp);

const database = require('../src/db/database')

describe('User', () => {
    let db

    before('task', async () => {
        db = await database.getDb("users")
    })

    after('task', async () => {
        db.collection.drop()

        db.client.close()
    })

    describe('Register', () => {
        it('Successful registration of user', (done) => {
            const user = {
                email: "testEmail@test.com",
                password: "test"
            }

            chai.request(server)
                .post("/user/register")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.an("object")
                    res.body.should.have.property("data")
                    res.body.data.should.have.property("msg")
                    res.body.data.msg.should.equal("Got a POST request, sending back 201: Created user")

                    done();
                });
        });

        it('Failed registration w/o user-details', (done) => {
            chai.request(server)
                .post("/user/register")
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.an("object");
                    res.body.should.have.property("errors");
                    res.body.errors.should.be.an("object");
                    res.body.errors.should.have.property("status");
                    res.body.errors.status.should.be.equal(500);
                    res.body.errors.should.have.property("source");
                    res.body.errors.source.should.be.equal("/user/register");
                    res.body.errors.should.have.property("title");
                    res.body.errors.title.should.be.equal("Error");
                    res.body.errors.should.have.property("detail");
                    res.body.errors.detail.should.be.equal("Empty POST request");

                    done();
                });
        });

        it('Failed registration w/o password', (done) => {
            const user = {
                email: "testEmail@test.com",
                password: ""
            }

            chai.request(server)
                .post("/user/register")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.an("object");
                    res.body.should.have.property("errors");
                    res.body.errors.should.be.an("object");
                    res.body.errors.should.have.property("status");
                    res.body.errors.status.should.be.equal(500);
                    res.body.errors.should.have.property("source");
                    res.body.errors.source.should.be.equal("/user/register");
                    res.body.errors.should.have.property("title");
                    res.body.errors.title.should.be.equal("Error");
                    res.body.errors.should.have.property("detail");
                    res.body.errors.detail.should.be.equal("Missing email or password");

                    done();
                });
        });

        it('Failed registration w/o email', (done) => {
            const user = {
                email: "",
                password: "test"
            }

            chai.request(server)
                .post("/user/register")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.an("object");
                    res.body.should.have.property("errors");
                    res.body.errors.should.be.an("object");
                    res.body.errors.should.have.property("status");
                    res.body.errors.status.should.be.equal(500);
                    res.body.errors.should.have.property("source");
                    res.body.errors.source.should.be.equal("/user/register");
                    res.body.errors.should.have.property("title");
                    res.body.errors.title.should.be.equal("Error");
                    res.body.errors.should.have.property("detail");
                    res.body.errors.detail.should.be.equal("Missing email or password");

                    done();
                });
        });
    });

    describe('Login', () => {
        it('Successful login of user', (done) => {
            const user = {
                email: "testEmail@test.com",
                password: "test"
            }

            chai.request(server)
                .post("/user/login")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.an("object");
                    res.body.should.have.property("data");
                    res.body.data.should.be.an("object");
                    res.body.data.should.have.property("_id");
                    res.body.data._id.should.not.be.empty;
                    res.body.data.should.have.property("email");
                    res.body.data.email.should.be.equal("testEmail@test.com");
                    res.body.data.should.have.property("token");
                    res.body.data.token.should.not.be.empty;

                    done();
                });
        });

        it('Failed login w/o user-details', (done) => {
            chai.request(server)
                .post("/user/login")
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.an("object");
                    res.body.should.have.property("errors");
                    res.body.errors.should.be.an("object");
                    res.body.errors.should.have.property("status");
                    res.body.errors.status.should.be.equal(500);
                    res.body.errors.should.have.property("source");
                    res.body.errors.source.should.be.equal("/user/login");
                    res.body.errors.should.have.property("title");
                    res.body.errors.title.should.be.equal("Error");
                    res.body.errors.should.have.property("detail");
                    res.body.errors.detail.should.be.equal("Empty POST request");

                    done();
                });
        });

        it('Failed login w/o password', (done) => {
            const user = {
                email: "testEmail@test.com",
                password: ""
            }

            chai.request(server)
                .post("/user/login")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.an("object");
                    res.body.should.have.property("errors");
                    res.body.errors.should.be.an("object");
                    res.body.errors.should.have.property("status");
                    res.body.errors.status.should.be.equal(500);
                    res.body.errors.should.have.property("source");
                    res.body.errors.source.should.be.equal("/user/login");
                    res.body.errors.should.have.property("title");
                    res.body.errors.title.should.be.equal("Error");
                    res.body.errors.should.have.property("detail");
                    res.body.errors.detail.should.be.equal("Missing email or password");

                    done();
                });
        });

        it('Failed login w/o email', (done) => {
            const user = {
                email: "",
                password: "test"
            }

            chai.request(server)
                .post("/user/login")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.an("object");
                    res.body.should.have.property("errors");
                    res.body.errors.should.be.an("object");
                    res.body.errors.should.have.property("status");
                    res.body.errors.status.should.be.equal(500);
                    res.body.errors.should.have.property("source");
                    res.body.errors.source.should.be.equal("/user/login");
                    res.body.errors.should.have.property("title");
                    res.body.errors.title.should.be.equal("Error");
                    res.body.errors.should.have.property("detail");
                    res.body.errors.detail.should.be.equal("Missing email or password");

                    done();
                });
        });
    });
});