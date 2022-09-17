process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/app');

chai.should();

chai.use(chaiHttp);

const database = require('../src/db/database')

describe('Docs', () => {
    let db

    before('task', async () => {
        db = await database.getDb()

        return db.collection.drop()
    })

    after('task', async () => {
        db.client.close()
    })

    describe('GET', () => {
        it('GET status 200', (done) => {
            chai.request(server)
                .get("/docs")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object")
                    res.body.should.have.property("data")
                    res.body.data.should.be.an("array")
                    res.body.data.length.should.be.equal(0)

                    done();
                });
        });
    });

    describe('POST', () => {
        it('POST status 201', (done) => {
            const doc = {
                title: "Hello World",
                content: "Hi~",
                innerHTML: "<div>Hi~</div>"
            }

            chai.request(server)
                .post("/docs/post")
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

    describe('PUT', () => {
        it('PUT status 404', (done) => {
            const doc = {
                _id: 123,
                title: "Hello World",
                content: "Hi~",
                innerHTML: "<div>Hi~</div>"
            }

            chai.request(server)
                .put("/docs/put")
                .send(doc)
                .end((err, res) => {
                    res.should.have.status(404);

                    done();
                });
        });
    });
});