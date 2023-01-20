const express = require('express')
const app = express();
const { DB } = require('./keys')
const mongoose = require('mongoose')
require('./model/storys')
const cors= require('cors')
const port = 3883

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
mongoose
    .connect(DB, connectionParams)
    .then(() => {
        console.log("DB connected successfully");
    })
    .catch((err) => {
        console.log("DB connection failed", err);
    });

app.use(express.json());

//routes
app.use(cors());
app.use(require('./routes/story'))

app.listen(port, () => {
    console.log(`server running at ${port}`)
})