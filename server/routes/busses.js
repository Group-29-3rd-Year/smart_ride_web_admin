const router = require("express").Router();
const { response } = require("express");
const pool = require("../db");

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

    if(newBus) {
      res.json("Bus was added");
    }

    //5. generating out twt token
    // const token = jwtGenerator(newBus.rows[0].bus_id);

    // res.json({ token });
    
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
    const { number, start, end } = req.body;

    //   res.json(req.bus.user);
    let id = req.params.bus_id;

    const updateBus = await pool.query(
      "UPDATE bus SET bus_number = $1, route_start = $2, route_end = $3  WHERE bus_id = $4",
      [number, start, end,  id]
    );

    if (updateBus) {
      res.json("Bus was updated");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.put("/delete/:bus_id", async (req, res) => {
  try {
    let id = req.params.bus_id;

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
