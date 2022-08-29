const express = require("express");
const router = express.Router();

const { google } = require("googleapis");

const { authSheets } = require("../funcs/googleapis");

router.get("/", async (req, res) => {
  const spreadsheetId =
    process.env.spreadsheetId || "1IfBG0PgM3v4pf5UBcqwQo3EogqsieCdNG1BLEz9zEFg";
  const { auth, authClient, sheets } = await authSheets("credentials-dev.json");
  const getRows = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "Sheet1!A1:E",
  });
  res.send(getRows.data);
});

router.post("/login", async (req, res) => {});

router.post("/register", async (req, res) => {
  // perform data cleaning and validation for the posted data
  const newUser = req.body;

  // create a new row in the spreadsheet
  const spreadsheetId =
    process.env.spreadsheetId || "1IfBG0PgM3v4pf5UBcqwQo3EogqsieCdNG1BLEz9zEFg";

  const { auth, authClient, sheets } = await authSheets("credentials-dev.json");
  const newRow = await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Sheet1",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [newUser],
    },
  });
});

router.put("/update", async (req, res) => {
  // perform data cleaning and validation for the posted data
  const updatedUser = req.body;

  // update a row in the spreadsheet
  const spreadsheetId =
    process.env.spreadsheetId || "1IfBG0PgM3v4pf5UBcqwQo3EogqsieCdNG1BLEz9zEFg";

  const { auth, authClient, sheets } = await authSheets("credentials-dev.json");
  const newRow = await sheets.spreadsheets.values.update({
    spreadsheetId: "1IfBG0PgM3v4pf5UBcqwQo3EogqsieCdNG1BLEz9zEFg",
    range: "Sheet1!E2",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [updatedUser],
    },
  });
});

module.exports = router;
