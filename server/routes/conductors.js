const router = require("express").Router();
const { response } = require("express");
const pool = require("../db");

router.get("/", async (req, res) => {
    try {
      //1. select query for view all busses in our database
      const conductors = await pool.query(
        "SELECT * FROM users WHERE is_admin= '0'"
      ); 
      //console.log(conductors);
      //2. check conductors in the database
      if (conductors.rows.length === 0) {
        return res.status(401).json("No any conductors in the database.");
      }
  
      res.json(conductors.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });


module.exports = router;