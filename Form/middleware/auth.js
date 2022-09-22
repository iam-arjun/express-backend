
const jwt = require('jsonwebtoken')

const Info = require("../contact_models/signup_model");




const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    const verifyuser = jwt.verify(token, "mynameisarjunphuyeliamfrombirtamodejhapa")
    console.log(verifyuser)
    const userInfo = await Info.findOne({ _id: verifyuser.id });

    req.token = token;

    req.userInfo = userInfo;



    next();




  }
  catch (e) {
    res.status(401).send('please log in first')

  }
}

module.exports = auth