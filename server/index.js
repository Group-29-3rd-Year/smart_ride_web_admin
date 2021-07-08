const express = require("express");
const app =  express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

//ROUTES//
//register and login
app.use("/smartride", require("./routes/smartride"));

//dashboard
app.use("/dashboard", require("./routes/dashboard"));


app.listen(3000, () => { 
    console.log("server is running on port 3000");
});



