const express = require('express')
const app = express()
const path = require('path')
app.set('view engine', 'ejs')
const fs = require('fs')

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req,res)=>{
    // read a file (folder)
    fs.readdir(`./Tasks`,(err,files)=>{
        res.render('Home',{files:files})
        console.log(files.length)
    })
})



app.listen(3000, ()=>{
    console.log("Server is Running...")
});