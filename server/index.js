const express = require("express");
const app =  express();
const cors = require("cors");

app.use(express.json()); //req.body
app.use(cors());

//ROUTES//
//register 
app.use("/smartride", require("./routes/register"));

//login 
app.use("/smartride", require("./routes/login"));

//dashboard
app.use("/smartride", require("./routes/dashboard"));


app.listen(5000, () => { 
    console.log("server is running on port 5000");
});



