require("dotenv").config();
console.log("📧 Email User:", process.env.EMAIL_USER);

const cToMongo = require('./database.js');

// ✅ now calling the correct function

const express = require('express');


var cors = require('cors');
cToMongo(); 
const app = express();
const port = 5000;
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies
//Available routes
app.use("/api/auth", require("./routes/auth"))
app.use("/api/notes", require("./routes/notes"))
app.use("/api/feedback", require("./routes/feedback"));
app.use("/api/settings", require("./routes/settings"));




app.get("/", (req, res) => {
  res.send("Hello Sania!");
});

app.listen(port, () => {
  console.log(`iNotebook backend app listening on port ${port}`);
});
