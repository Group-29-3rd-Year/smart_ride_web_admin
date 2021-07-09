const router = require("express").Router();
const pool = require("../db");
const jwtGenerator = require("../utils/jwtGenerator");

router.post("/add", async (req, res) => {
  try {
    //1. destructure the req.body
    const { number, start, end } = req.body;

    //2. check if bus exist (if bus exist then throw error)
    const bus = await pool.query("SELECT * FROM bus WHERE bus_number = $1", [
      number,
    ]);

    if (bus.rows.length !== 0) {
      return res.status(401).send("Bus already exists");
    }

    //4. enter new bus inside our database
    const newBus = await pool.query(
      "INSERT INTO bus (bus_number, route_start, route_end, is_running) VALUES ( $1, $2, $3, '1') RETURNING *",
      [number, start, end]
    );

    //5. generating out twt token
    const token = jwtGenerator(newBus.rows[0].bus_id);

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/", async (req, res) => {
  try {
    //1. select query for view all busses in our database
    const busses = await pool.query(
      "SELECT bus_number, route_start, route_end FROM bus"
    );

    //2. check busses in the database
    if (busses.rows.length === 0) {
      return res.status(401).json("No any bus in the database.");
    }

    res.json(busses.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
