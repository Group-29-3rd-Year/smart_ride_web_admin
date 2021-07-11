const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const jwtToken = req.params.bus_id;

    if (!jwtToken) {
      return res.status(403).json("Not Authorize");
    }

    const payload = jwt.verify(jwtToken, process.env.jwtSecret);

    req.bus = payload.user;

    next();
  } catch (err) {
    console.error(err.message);
    return res.status(403).json("Not Authorize Man");
  }
};
