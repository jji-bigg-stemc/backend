const express = require("express");
const PORT = require("./constants").PORT;
const { google } = require("googleapis");

const getSpreadsheet = require("./funcs/googleapis").getSpreadsheet;

const app = express();
// using cors: https://expressjs.com/en/resources/middleware/cors.html
const cors = require("cors");

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", cors(), async (req, res) => {
  // return the client object for the google api
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials-dev.json",
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const metaData = await sheets.spreadsheets.get({
    spreadsheetId: "1IfBG0PgM3v4pf5UBcqwQo3EogqsieCdNG1BLEz9zEFg",
  });

  // read rows from spreadsheet
  const getRows = await sheets.spreadsheets.values.get({
    spreadsheetId: "1IfBG0PgM3v4pf5UBcqwQo3EogqsieCdNG1BLEz9zEFg",
    range: "Sheet1!A1:E",
  });

  // writing a new row to the spreadsheet
  const newRow = await sheets.spreadsheets.values.append({
    spreadsheetId: "1IfBG0PgM3v4pf5UBcqwQo3EogqsieCdNG1BLEz9zEFg",
    range: "Sheet1",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [["test", "test", "test", "test"]],
    },
  });

  // update a row in the spreadsheet
  await sheets.spreadsheets.values.update({
    spreadsheetId: "1IfBG0PgM3v4pf5UBcqwQo3EogqsieCdNG1BLEz9zEFg",
    range: "Sheet1!E2",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [["test"]],
    },
  });

  // delete a row from the spreadsheet
  await sheets.spreadsheets.values.clear({
    spreadsheetId: "1IfBG0PgM3v4pf5UBcqwQo3EogqsieCdNG1BLEz9zEFg",
    range: "Sheet1!A3:Z1000",
  });

  // look up a row id based on the value (the username eg)
  // https://stackoverflow.com/questions/49161249/google-sheets-api-how-to-find-a-row-by-value-and-update-its-content

  res.send(newRow);
});

app
  .listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  })
  .on("error", (err) => {
    console.log(err);
  });
