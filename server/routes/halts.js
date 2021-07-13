const router = require("express").Router();
const pool = require("../db");

router.post("/add", async (req, res) => {
  try {
    //1. destructure the req.body
    const { name } = req.body;

    //2. check if bus exist (if bus exist then throw error)
    const halt = await pool.query("SELECT * FROM halt WHERE halt_name = $1", [
      name,
    ]);

    if (halt.rows.length !== 0) {
      return res.status(401).send("Halt already exists");
    }

    //4. enter new bus inside our database
    const newHalt = await pool.query(
      "INSERT INTO halt (halt_name, is_deleted) VALUES ( $1, '0') RETURNING *",
      [name]
    );

    if (newHalt) {
      res.json("Halt was added.");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/", async (req, res) => {
  try {
    //1. select query for view all busses in our database
    const halts = await pool.query("SELECT halt_id, halt_name FROM halt");

    //2. check busses in the database
    if (halts.rows.length === 0) {
      return res.status(401).json("No any halts in the database.");
    }

    res.json(halts.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.put("/update/:halt_id", async (req, res) => {
  try {
    //   1. destructure the req.body
    const { name } = req.body;

    //   res.json(req.bus.user);
    let id = req.params.halt_id;

    const updateHalt = await pool.query(
      "UPDATE halt SET halt_name = $1 WHERE halt_id = $2",
      [name, id]
    );

    if (updateHalt) {
      res.json("Halt was updated");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.put("/delete/:halt_id", async (req, res) => {
  try {
    //   res.json(req.bus.user);
    let id = req.params.halt_id;

    const deleteHalt = await pool.query(
      "UPDATE halt SET is_deleted = '1' WHERE halt_id = $1",
      [id]
    );

    if (deleteHalt) {
      res.json("Bus was deleted");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
