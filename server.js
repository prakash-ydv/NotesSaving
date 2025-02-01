const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser'); // Explicit import
const { log } = require('console');

// Middleware Setup
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser()); // Initialize cookie-parser

// Home Route - Reads "Tasks" Folder
app.get('/', (req, res) => {
    const folderPath = path.join(__dirname, 'Tasks'); // Use absolute path for safety

    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error('Error reading Tasks folder:', err);
            return res.status(500).send('Error reading tasks folder');
        }
        
        res.render('Home', { files: files });
    });
});

app.post('/create', (req,res)=>{
    fs.writeFile(`./Tasks/${req.body.title}.txt`.replace(/ /g, '-'), req.body.desc , (err)=>{
        console.log(err)
    })
    
    res.redirect('/')
    
})

app.get('readtask/:taskname', (req,res) => {

})

// Start Server
app.listen(3000, () => {
    console.log("Server is Running on http://localhost:3000");
});
