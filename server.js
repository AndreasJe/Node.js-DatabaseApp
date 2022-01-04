
//Santiago's router system for the api
const express = require("express")
const app = express()
const path = require("path")
const mongoClient = require("mongodb").MongoClient
// Database connection and setup of global db variable
const mongoUrl = "mongodb://localhost:27017/"
global.db = ""
mongoClient.connect(mongoUrl,(err, res) =>{
    if(err){console.log("Database error"); return}
    db = res.db("exam_app")
    console.log("Database ready...")
})


//const rPostUsers = require(__dirname+"/routes/students/post-students.js")
const rPostUsers = require(path.join(__dirname,"routes","students", "post-students.js"))
app.post("/students", rPostUsers)

app.listen(80, err => {
    if(err){console.log("server error"); return}
    console.log("Server ready...")
})