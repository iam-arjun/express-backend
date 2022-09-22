let http = require('http');
let fs = require('fs');

let port = 4000;

http.createServer(function(req,res){


    res.write('Hello world');
    res.end();

    
}).listen(4000,function(){
    console.log(`listening at the port: ${port}`);
});
