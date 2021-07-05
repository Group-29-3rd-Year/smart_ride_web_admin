const jwt = require("jsonwebtoken");
require("dotenv").config();

//this middleware will on continue on if the token is inside the local storage

module.exports = function(req, res, next) {
  
  try {

    // Get token from header
    const jwtToken = req.header("token");

    // Check if not token
    if (!jwtToken) {
      return res.status(403).json("authorization denied");
    }

    //it is going to give use the user id (user:{id: user.id})
    const payload = jwt.verify(token, process.env.jwtSecret);

    req.user = payload.user;
    next();

  } catch (err) {
    console.error(err.message);
    return res.status(403).json("authorization denied");
  }
};