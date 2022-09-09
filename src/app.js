require('dotenv').config()

const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
const app = express();

const {mwindex} = require('./middleware/index');

const hello = require('./routes/hello');
const docAll = require('./routes/docGetAll');
const docPost = require('./routes/docPost');

const port = process.env.PORT || 8081;

app.use(cors());
app.use(morgan('combined'));

app.use(mwindex);

app.use('/hello', hello);
app.use("/docs/all", docAll);
app.post("/docs", docPost);

app.listen(port, () => {console.log(`starting server on port: ${port}`)});
