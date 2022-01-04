// NPM installled files
const mongoClient = require("mongodb").MongoClient
// Server Connection URL
const mongoUrl = "mongodb://localhost:27017/"
// Database Pointer
let db = ''

// Critical errors 
process.on("uncaughtException", (err, data) => {
    if(err){
    console.log("Critical Error happened, system continues as is.")
      return
    }
})


mongoClient.connect(mongoUrl, (err, res) => {
    //IF error happens return
    if(err){console.log("database error"); return}
    db = res.db("exam_app")
    const deleteThis = {"name":"A"}    
    db.collection("students").deleteMany( deleteThis, (err, res) => {
        
    if(err){console.log("Cannot delete"); return}
    console.log(res)

    })

})