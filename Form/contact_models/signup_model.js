const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SignUpSchema = new mongoose.Schema({
    name: {
        type: String

    },
    email: {
        type: String



    },
    password: {
        type: String


    },
    repeat_pass: {
        type: String
    },
    tokens: [{
        token: {
            type: String,

        }
    }]
})


// Method for generating the token for user
SignUpSchema.methods.generateAuthToken = async function () {
    try {
        console.log(this.id)
        const mytoken = jwt.sign({ id: this._id }, "mynameisarjunphuyeliamfrombirtamodejhapa");
        console.log(`generate token : ${mytoken}`);
        this.tokens = this.tokens.concat({ token: mytoken })
        await this.save();
        return mytoken;
    }
    catch (e) {
        console.log(e);


    }
}







// Bcrypt security in signup form

SignUpSchema.pre('save', async function (next) {
    if (this.isModified('password')) {

        this.password = await bcrypt.hash(this.password, 10);
        this.repeat_pass = await bcrypt.hash(this.repeat_pass, 10);


    }

    next()



})
//Defining the model i.e the collection name..... 

const Login = mongoose.model("Signupdata", SignUpSchema);

module.exports = Login