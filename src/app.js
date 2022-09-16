require("dotenv").config()

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

const { mwindex } = require("./middleware/index");

const doc = require("./routes/doc");
const docPost = require("./routes/docPost");
const docPut = require("./routes/docPut")

const port = process.env.PORT || 8082;

app.use(cors());
app.options('*', cors());
app.disable('x-powered-by');
app.use(express.json())
app.use(morgan("combined"));

app.use(mwindex);

app.use("/docs", doc)
app.use("/docs/post", docPost);
app.use("/docs/put", docPut)

var server = app.listen(port, function () {
    var host = server.address().address;
    console.log('App listening at', host, port);
});

module.exports = server
