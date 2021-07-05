const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const validInfo = require("../middleware/validInfo");
const authorize = require("../middleware/authorize");


// login

router.post("/login", validInfo, async (req, res) => {

    const { email , password } = req.body;

    try {

        //1. destructure the req.body

        //2. check if user dosen't exist(if not then thrwo error)

        const user = await pool.query("SELECT * FROM users email= $1", 
                                            [
                                                email
                                            ]);
        if(user.rows.length === 0 ){
            return res.status(401).json("Password or User name is incorrect");
        }

        //3. check if incoming password is the same the db password

        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if (!validPassword) {
            return res.status(401).json("Invalid Credential");
        }

        //4. give them the jwt token

        const token = jwtGenerator(user.rows[0].id);

        res.json(token); 

    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

router.post("/verify", authorize, (req, res) => {
    try {
      res.json(true);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server 2 error");
    }
});

module.exports = router;