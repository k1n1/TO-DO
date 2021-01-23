const express = require("express")
const app = express()
const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/TODO", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true}, ()=>{
    console.log("Database Connected")
})


const home = require("./Routers/home")
// app.use(express.static('./public'))
app.use(express.json())
app.use("/", home)



app.listen(3000, ()=>{
    console.log("Server Start At PORT 3000");
})