const express = require('express');
const { generateFile } = require('./generateFile');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.get('/', (req, res) => {
    return res.json({Hello:"Coder!"});
});
app.post("/run", async (req, res) => {
 const{ language = "cpp", code} = req.body;
 if(code == undefined){
     return res.status(400).json({success: "False", error: "COde Missing"})
 }
 // now here we need to generate a c++ file with content
 const filepath = await generateFile(language, code);
 //from the req and we need to run the file and then send response
 
 return res.json({filepath});
});
app.listen(5000, () => {
    console.log('Listening on the port: 5000');
});