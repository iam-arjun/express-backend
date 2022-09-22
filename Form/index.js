require('dotenv').config()

const express = require('express')
const path = require('path');
const auth = require('./middleware/auth')


const port = 4200;
const bcrypt = require('bcrypt')
require('./dbconn');

const Info = require('./contact_models/signup_model.js');
const cookieParser = require('cookie-parser');

const app = express();




app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.get('/', (req, res) => {


    res.sendFile(path.join(__dirname, 'homepage.html'));
})
app.get('/about', auth, (req, res) => {
    console.log(`my cookie value: ${req.cookies.jwt} `)

    res.sendFile(path.join(__dirname, 'about.html'));
})

app.get('/logout', auth, async (req, res) => {
    try {
        console.log('logging out user');

        // code for clearing the cookie from the browser
        res.clearCookie("jwt");
        // single token remove from the database i.e logout from single device
        // req.userInfo.tokens = req.userInfo.tokens.filter((lasttoken) => {
        //     return lasttoken.token !== req.token
        // })
        req.userInfo.tokens = []


        await req.userInfo.save()
        res.sendFile(path.join(__dirname, 'login.html'));


    } catch (error) {
        console.log(error);

    }







})



app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'signup.html'));
})
app.get('/register', (req, res) => {
    res.send('Hi this is my registeration');
})
app.get('/login', async (req, res) => {

    res.sendFile(path.join(__dirname, 'login.html'));



})
app.post('/logindata', async (req, res) => {
    try {
        const email = req.body.email;
        const pass = req.body.password;

        const mydata = await Info.findOne({ email: email })


        const ismatch = await bcrypt.compare(pass, mydata.password)

        const token = await mydata.generateAuthToken();
        console.log(`after login :  ${token}`)


        // creating the cooking while login
        res.cookie('jwt', token, {
            expires: new Date(Date.now() + 300000),
            httpOnly: true
        });


        if (ismatch) {
            res.sendFile(path.join(__dirname, 'homepage.html'))
       

        }
        else {
            res.status(400).send("Invalid Details");
        }
    }

    catch (e) {
        res.status(400).send('Error in logging  data')
    }



    // console.log(email)
    // res.status(201).send(email);



})




app.post('/register', async (req, res) => {
    try {
        if (req.body.password === req.body.repeat_pass) {
            const mydata = new Info(req.body);

            // Generating token for the user authentication
            const token = await mydata.generateAuthToken();
            console.log(`after signup :  ${token}`)
            await mydata.save();

            //creating the cookie while signing up

            res.cookie('jwt', token, {
                expires: new Date(Date.now() + 300000),
                httpOnly: true
            });




            res.status(201).send(mydata);


        }
        else {
            res.send('Invalid form detail')
        }

    } catch (e) {
        console.log(e);

    }
})









app.listen(port, () => {
    console.log(`SERVER IS RUNNING!!${port}`);


})











