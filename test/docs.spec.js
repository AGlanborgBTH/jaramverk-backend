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

    // describe('GET, POST & PUT', () => {
    //     it('get, add & edit', (done) => {
    //         let id

    //         chai.request(server)
    //             .post("/docs/post")
    //             .send({
    //                 title: "Hello World",
    //                 content: "Hi~",
    //                 innerHTML: "<div>Hi~</div>"
    //             })
    //             .end((err, res) => {
    //                 res.should.have.status(201);
    //                 res.body.should.be.an("object")
    //                 res.body.should.have.property("data")
    //                 res.body.data.should.have.property("msg")
    //                 res.body.data.msg.should.equal("Got a POST request, sending back 201: Created doc")

    //                 done()
    //             });

    //         chai.request(server)
    //             .get("/docs")
    //             .end((err, res) => {
    //                 console.log(res.body)
    //                 res.should.have.status(200);
    //                 res.body.should.be.an("object")
    //                 res.body.should.have.property("data")
    //                 res.body.data.should.be.an("array")
    //                 res.body.data.length.should.be.equal(1)
    //                 id = res.body.data[0]._id

    //                 done()
    //             });

    //         chai.request(server)
    //             .put("/docs/put")
    //             .send({
    //                 _id: id,
    //                 title: "Hello",
    //                 content: "Hi~",
    //                 innerHTML: "<div>Hi~</div>"
    //             })
    //             .end((err, res) => {
    //                 res.should.have.status(204);
    //                 res.body.should.be.an("object")
    //                 res.body.should.have.property("data")
    //                 res.body.data.should.have.property("msg")
    //                 res.body.data.msg.should.equal("Got a PUT request, sending back 204: Doc updated")

    //                 done();
    //             });
    //     });
    // });
});