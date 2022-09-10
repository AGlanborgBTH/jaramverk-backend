require("dotenv").config()

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

const {mwindex} = require("./middleware/index");

const doc = require("./routes/doc");
const docPost = require("./routes/docPost");

const port = process.env.PORT || 8081;

app.use(cors());
app.use(morgan("combined"));

app.use(mwindex);

app.use("/docs", doc)
app.use("/docs/post", docPost);

app.listen(port, () => {console.log(`starting server on port: ${port}`)});
