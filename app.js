const express = require("express");
const path = require("path");
const app = express();
const port = 4200;
const hbs = require("hbs");

// this is a express built-in middleware to serve the static file like html

const webPath = path.join(__dirname,"webpage");

app.use(express.static(webPath));

// middleware ends here

// Routing for homepage









const temp_eng_path = path.join(__dirname,"Template_engine/views");
const partialPath = path.join(__dirname,'Template_engine/partials');

// To use the view engine/template engine

app.set("view engine","hbs");


// For changing the folder name of view engine  we need the folder path

app.set("views",temp_eng_path);
hbs.registerPartials(partialPath);









// template engine route

app.get('',(req,res)=>{
    res.render('index',{
        name:"arjun"
    });
});

// hbs file ends here
// hbs file is nothing but one of the template engine which is used to display the file data dynamically (more powerful than html as it only serve static data)


app.get("/", (req, res) => {
    res.send("hi this is my homepage");
});

// Routing for the about page
``
app.get("/about", (req, res) => {

    res.send("Welcome to about page");

});

app.get('/about/*',(req,res)=>{
    res.render('404', {
        about_404:"OOPS ABOUT PAGE NOT FOUND"
    });
});

app.get('*',(req,res)=>{
    res.render('404',{
       
       home_404 :"OOPS HOME PAGE COULDNOT BE FOUND"
    });
});

















// for listening the request by user 
app.listen(4200, () => {

    console.log(`App is responding by listening the request at http://
    localhost:${port}`);

});
