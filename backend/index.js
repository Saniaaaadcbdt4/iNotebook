require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cToMongo = require("./database.js");

// ✅ Connect to MongoDB Atlas
cToMongo();

// ✅ Initialize app
const app = express();
const port = process.env.PORT || 5000;

// ✅ Middlewares

app.use(express.json());
app.use(cors({
  origin: "*", // allow all origins
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true
}));


// ✅ Available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));
app.use("/api/feedback", require("./routes/feedback"));
app.use("/api/settings", require("./routes/settings"));

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Hello Sania!");
});

// ✅ Start server
app.listen(port, () => {
  console.log(`🚀 iNotebook backend running on port ${port}`);
});
