const express = require("express");
const cors = require("cors")
const app = express();
const path = require("path")
app.use(cors())
require("./models/model.js");
require('./models/post')
app.use(express.json());


app.use(require("./routes/auth.js"));
app.use(require("./routes/createPost"))
app.use(require("./routes/user"))
const mongoose = require("mongoose");

// const PORT = 5000;
const PORT = process.env.port || 5000

//serving frontend
app.use(express.static(path.join(__dirname,"./frontend/build")))
app.get("*",(req,res)=>{
  res.sendFile(
    path.join(__dirname,"./frontend/build/index.html"),
    function(err){
        res.status(500).send(err)
    }
  )
})

app.listen(PORT, () => {
  console.log("server is running on port " + PORT);
});

const {mongoURL} = require("./keys.js");

mongoose.connect(mongoURL);

mongoose.connection.on("connected", () => {
  console.log("Succcessfully connected to mongoose");
});
mongoose.connection.on("error", () => {
  console.log("Not connected to mongoose");
});
