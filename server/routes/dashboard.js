const express = require("express");
const router = express.Router();
const pool = require("../db");
const authorize = require("../middleware/authorize");

router.get("/", authorize, async (req, res) => {

    try {
        
        //res.json(req.user);
        const user = await pool.query("SELECT name FROM users WHERE id = $1", [req.user]);

        res.json(user.rows[0]);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
})

module.exports = router;