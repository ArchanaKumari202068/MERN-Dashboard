const express = require("express");
const mongoose = require('mongoose');
const {statistics,filterByYr,bar,line,radar} = require('./controller/data_controller');
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const mongoDbUrl = process.env.MONGO_DB_URL
mongoose.connect(mongoDbUrl)

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
console.log("Connected successfully");
});
app.get('/',(req,res)=>{
    res.send("Hello People...")
})

app.get('/statistics',statistics)
app.get('/filterByYr',filterByYr)
app.get('/bar',bar)
app.get('/line',line)
// app.get('/analyzeByImpactInc',analyzeByImpactInc)
app.get('/radar',radar)
// app.get('/scatter',scatter)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});

