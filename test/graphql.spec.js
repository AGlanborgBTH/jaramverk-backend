process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const server = require('../src/app');

chai.should();

chai.use(chaiHttp);

const database = require('../src/db/database');

describe('GraphQL', () => {
    let db;

    before('task', async () => {
        db = await database.getDb("docs");
    });

    after('task', async () => {
        db.collection.drop();

        db.client.close();
    });

    describe('successful request from docs', () => {
        const payload = { email: 'testEmail@test.com' };
        const secret = process.env.JWT_SECRET;
        const token = jwt.sign(payload, secret, { expiresIn: '1h' });
        const query = `query Docs {
            docs {
              _id
              title
              content
              innerHTML
            }
        }`;

        it('docs Status 200', (done) => {
            chai.request(server)
                .post("/graphql")
                .set("x-access-token", token)
                .send({ query })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object")
                    res.body.should.have.property("data")
                    res.body.data.should.have.property("docs")

                    done();
                });
        });
    });

    describe('successful request from docsByUser', () => {
        const payload = { email: 'testEmail@test.com' };
        const secret = process.env.JWT_SECRET;
        const token = jwt.sign(payload, secret, { expiresIn: '1h' });
        const query = `query DocsByUser ( $cond: String! ) {
            docsByUser ( id: $cond ) {
              _id
              title
              content
              innerHTML
            }
        }`;
        const cond = '*';

        it('docsByUser Status 200', (done) => {
            chai.request(server)
                .post("/graphql")
                .set("x-access-token", token)
                .send({ query, variables: { cond } })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object")
                    res.body.should.have.property("data")
                    res.body.data.should.have.property("docsByUser")

                    done();
                });
        });
    });
});