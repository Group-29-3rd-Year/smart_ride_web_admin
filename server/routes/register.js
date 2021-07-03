const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const validInfo = require("../middleware/validInfo");

//registering

router.post("/register", validInfo, async (req,res) => {
    try {
        
        //1. destructure the req.body
        const {name, phone_no, email, password} = req.body;


        //2. check if use exist (id user exist then throw error)
        const user = await pool.query("SELECT * FROM users WHERE email = $1," 
                                        [
                                            email
                                        ]);

        if(user.rows.length !== 0){
            return res.status(404).send("User already exists");
        }

        //3. bcrypt the password

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt);

        //4. enter new user inside our database

        const newUser = await pool.query
                                ("INSERT INTO users (id, name, phone_no, email, password,  is_admin) VALUES('1',$1,$2,$3,$4, '1') RETURNING *",
                                [name, phone_no, email, bcryptPassword]);

        res.json(newUser.rows[0]); 

        //5. generating out twt token

        // const token = jwtGenerator(newUser.rows[0].user_id);

        // res.json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
})

module.exports = router;