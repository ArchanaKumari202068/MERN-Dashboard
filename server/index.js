const express = require("express");
const mongoose = require('mongoose');
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

app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});

