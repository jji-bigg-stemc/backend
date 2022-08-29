const express = require("express");
const PORT = require("./constants").PORT;
const { google } = require("googleapis");

const getSpreadsheet = require("./funcs/googleapis").getSpreadsheet;

const app = express();
// using cors: https://expressjs.com/en/resources/middleware/cors.html
const cors = require("cors");

app.use(
  cors({
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "X-Access-Token",
    ],
    allowedOrigins: ["http://localhost:3000", "http://localhost:8000"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const users = require("./routes/users");

app.use(express.static(__dirname + "/public"));
app.use("/users", users);

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app
  .listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  })
  .on("error", (err) => {
    console.log(err);
  });
