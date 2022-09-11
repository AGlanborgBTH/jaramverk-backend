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
app.options('*', cors());
app.disable('x-powered-by');
app.use(express.json())
app.use(morgan("combined"));

app.use(mwindex);

app.use("/docs", doc)
app.use("/docs/post", docPost);

app.listen(port, () => {});
