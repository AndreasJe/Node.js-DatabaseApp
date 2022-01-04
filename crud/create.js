const mongoClient = require("mongodb").MongoClient
const mongoUrl = "mongodb://localhost:27017/"
let db = ''

process.on("uncaughtException", (err, data) => {
    if(err){
    console.log("Critical Error happened, system continues as is.")
    console.log(data) 
    //Instead of Data, we could send error message to the System administrator. 
    return
    }
})

mongoClient.connect(mongoUrl,{ useUnifiedTopology: true }, (err, res) => {
    if(err){console.log("database error"); return}
    db = res.db("exam_app")
    let student = {"name":"A", "lastName":"A2"}
    db.collection("students").insertOne(student, (err, res) => {
        if(err){console.log("Cant query data"); return}
        console.log(`User created: ${res.acknowledged} `)
        console.log(`User id: ${res.insertedId} `)
    })
})