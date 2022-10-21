process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const server = require('../src/app');

chai.should();

chai.use(chaiHttp);

const database = require('../src/db/database');

describe('Doc', () => {
    let db;

    before('task', async () => {
        db = await database.getDb("docs");
    });

    after('task', async () => {
        db.collection.drop();

        db.client.close();
    });

    describe('GET all docs with a token', () => {
        const payload = { email: 'testEmail@test.com' };
        const secret = process.env.JWT_SECRET;
        const token = jwt.sign(payload, secret, { expiresIn: '1h' });

        it('GET status 401', (done) => {
            chai.request(server)
                .get("/doc")
                .set("x-access-token", token)
                .set("data-user-id", 123)
                .set("data-user-email", "testEmail@test.com")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.should.have.property("data");
                    res.body.data.should.be.an("array");
                    res.body.data.length.should.be.equal(0);

                    done();
                });
        });
    });

    describe('POST document to database', () => {
        it('POST status 201', (done) => {
            const payload = { email: 'testEmail@test.com' };
            const secret = process.env.JWT_SECRET;
            const token = jwt.sign(payload, secret, { expiresIn: '1h' });
            const doc = {
                title: "Hello World",
                content: "Hi~",
                innerHTML: "<div>Hi~</div>"
            }

            chai.request(server)
                .post("/doc/post")
                .set("x-access-token", token)
                .set("data-user-id", 123)
                .set("data-user-email", "testEmail@test.com")
                .send(doc)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.an("object")
                    res.body.should.have.property("data")
                    res.body.data.should.have.property("msg")
                    res.body.data.msg.should.equal("Got a POST request, sending back 201: Created doc")

                    done();
                });
        });
    });

    describe('PUT document in database', () => {
        it('PUT status 404', (done) => {
            const payload = { email: 'testEmail@test.com' };
            const secret = process.env.JWT_SECRET;
            const token = jwt.sign(payload, secret, { expiresIn: '1h' });
            const doc = {
                _id: 123,
                title: "Hello",
                content: "Hi~",
                innerHTML: "<div>Hi~</div>"
            }

            chai.request(server)
                .put("/doc/put")
                .set("x-access-token", token)
                .set("data-user-id", 123)
                .set("data-user-email", "testEmail@test.com")
                .send(doc)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object")
                    res.body.should.have.property("data")
                    res.body.data.should.have.property("msg")
                    res.body.data.msg.should.equal("Got a PUT request, sending back 200: Doc updated")

                    done();
                });
        });
    });
});