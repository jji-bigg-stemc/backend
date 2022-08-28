const express = require("express");
const PORT = require("./constants").PORT;

const app = express();
// using cors: https://expressjs.com/en/resources/middleware/cors.html
const cors = require("cors");

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", cors(), (req, res) => {
  res.send("Hello World");
});

app
  .listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  })
  .on("error", (err) => {
    console.log(err);
  });
