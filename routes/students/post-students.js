const formidable = require("formidable")
const detect = require("detect-file-type")
const {v1: uuidv1} = require("uuid")
const fs = require("fs")
const path = require("path")
const { Db } = require("mongodb")
const { resolveSoa } = require("dns")

module.exports = (req, res) => {
    const form = new formidable.IncomingForm()
    form.parse(req, (err, fields, files)=>{
        if(err){return res.send("Error: Problem with file")}
        //console.log(`Firstname: ${fields.firstname}`)
        //console.log(`Lastname: ${fields.lastname}`)
        //console.log(files.image.originalFilename)
        //console.log(files.image.filepath)
        detect.fromFile( files.image.filepath, (err, result) => {
            
            const imageName = uuidv1()+"."+result.ext
            const allowedImageTypes = ["jpg", "jpeg", "png"]
            console.log(imageName) // 847599b0-6cb6-11ec-bf07-dff19dca35cd.jpg

            if( ! allowedImageTypes.includes(result.ext)   ){
                return res.send("Image type is not allowed")
            }

            const oldPath = files.image.filepath
            const newPath = path.join(__dirname,"..","..","images", imageName)

            fs.rename(oldPath, newPath, err => {
                if(err){console.log("Error: Problem accured when moving file"); return}
                const student = {
                "firstname":fields.firstname,
                "lastname":fields.lastname, 
                "image":imageName
                                }

                try {
                db.collection("students").insertOne(student,(err, dbResponse)=>{
                    if(err){return res.send("Error: MongoDB couldnt create user")}
                    return res.send("Information received")
                })
            }catch(ex){
return res.status(500).send("System is being updated ")
                }
            })    
        })
    })
}