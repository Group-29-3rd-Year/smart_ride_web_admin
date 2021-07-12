const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorizationForBus");
const jwtGenerator = require("../utils/jwtGenerator");

router.post("/add", async (req, res) => {
  try {
    //1. destructure the req.body
    const { number, route_start, route_end ,conductor_id} = req.body;

    //2. check if bus exist (if bus exist then throw error)
    const bus = await pool.query("SELECT * FROM bus WHERE bus_number = $1", [
      number,
    ]);

    if (bus.rows.length !== 0) {
      return res.status(401).send("Bus already exists");
    }

    //4. enter new bus inside our database
    const newBus = await pool.query(
      "INSERT INTO bus (bus_number, route_start, route_end, conductor_id, is_running) VALUES ( $1, $2, $3, $4, '1') RETURNING *",
      [number, route_start, route_end, conductor_id]
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
      "SELECT bus_number, route_start, route_end, conductor_id FROM bus"
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

router.put("/update/:bus_id", async (req, res) => {
  try {
    //   1. destructure the req.body
    const { number, route_start, route_end , conductor_id} = req.body;

    //   res.json(req.bus.user);
    let id = req.bus.user;

    const updateBus = await pool.query(
      "UPDATE bus SET bus_number = $1, r_start = $2, r_end = $3 , conductor_id = $4 WHERE bus_id = $5",
      [number, route_start, route_end, conductor_id, id]
    );

    if (updateBus) {
      res.json("Bus was updated");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.put("/delete/:bus_id", authorization, async (req, res) => {
  try {
    let id = req.bus.user;

    const deleteBus = await pool.query(
      "UPDATE bus SET is_running = '0' WHERE bus_id = $1",
      [id]
    );

    if (deleteBus) {
      res.json("Bus was deleted");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
