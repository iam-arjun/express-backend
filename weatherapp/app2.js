



// // listening the request by the client in the server, created using node.js

// server.listen(8000, "127.0.0.1");
const express = require("express");
const path = require("path");
const app = express();
const port = 8000;
const hbs = require("hbs");




const webPath = path.join(__dirname, "public");
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/weather.html'));

})





// for listening the request by user 
app.listen(8000, () => {

    console.log(`App is responding by listening the request at http://
    localhost:${port}`);

});


