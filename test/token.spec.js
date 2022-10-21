process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/app');

chai.should();

chai.use(chaiHttp);

const database = require('../src/db/database')

describe('Token check for /doc', () => {
    let db

    before('task', async () => {
        db = await database.getDb("docs")
    })

    after('task', async () => {
        db.collection.drop()

        db.client.close()
    })

    describe('Failed GET w/o token', () => {
        it('GET status 401', (done) => {
            chai.request(server)
                .get("/doc")
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an("object")
                    res.body.should.have.property("errors")
                    res.body.errors.should.have.property("status")
                    res.body.errors.status.should.be.equal(401)
                    res.body.errors.should.have.property("message")
                    res.body.errors.message.should.be.equal("Invalid token")

                    done();
                });
        });
    });

    describe('Failed POST w/o token', () => {
        it('POST status 401', (done) => {
            const doc = {
                title: "Hello World",
                content: "Hi~",
                innerHTML: "<div>Hi~</div>"
            }

            chai.request(server)
                .post("/doc/post")
                .send(doc)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an("object")
                    res.body.should.have.property("errors")
                    res.body.errors.should.have.property("status")
                    res.body.errors.status.should.be.equal(401)
                    res.body.errors.should.have.property("message")
                    res.body.errors.message.should.be.equal("Invalid token")

                    done();
                });
        });
    });

    describe('Failed PUT w/o token', () => {
        it('PUT status 401', (done) => {
            const doc = {
                _id: 123,
                title: "Hello World",
                content: "Hi~",
                innerHTML: "<div>Hi~</div>"
            }

            chai.request(server)
                .put("/doc/put")
                .send(doc)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an("object")
                    res.body.should.have.property("errors")
                    res.body.errors.should.have.property("status")
                    res.body.errors.status.should.be.equal(401)
                    res.body.errors.should.have.property("message")
                    res.body.errors.message.should.be.equal("Invalid token")

                    done();
                });
        });
    });
});

describe('Token check for /email', () => {
    let db

    before('task', async () => {
        db = await database.getDb("docs")
    })

    after('task', async () => {
        db.collection.drop()

        db.client.close()
    })

    describe('Failed email-request w/o token', () => {
        it('GET status 401', (done) => {
            chai.request(server)
                .get("/email")
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an("object")
                    res.body.should.have.property("errors")
                    res.body.errors.should.have.property("status")
                    res.body.errors.status.should.be.equal(401)
                    res.body.errors.should.have.property("message")
                    res.body.errors.message.should.be.equal("Invalid token")

                    done();
                });
        });
    });
});

describe('Token check for /graphql', () => {
    let db

    before('task', async () => {
        db = await database.getDb("docs")
    })

    after('task', async () => {
        db.collection.drop()

        db.client.close()
    })

    describe('Failed graphql-request w/o token', () => {
        it('GET status 401', (done) => {
            chai.request(server)
                .get("/graphql")
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an("object")
                    res.body.should.have.property("errors")
                    res.body.errors.should.have.property("status")
                    res.body.errors.status.should.be.equal(401)
                    res.body.errors.should.have.property("message")
                    res.body.errors.message.should.be.equal("Invalid token")

                    done();
                });
        });
    });
});