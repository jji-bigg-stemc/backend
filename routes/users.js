const express = require("express");
const router = express.Router();

const { google } = require("googleapis");

const { authSheets } = require("../funcs/googleapis");

// update these below to match dev and prod environments
// const SHEET_NAME = "Users";
const SHEET_NAME = "Sheet1";

const CRED_FILE = "credentials-dev.json";

const SHEET_ID =
  process.env.SHEET_ID || "1IfBG0PgM3v4pf5UBcqwQo3EogqsieCdNG1BLEz9zEFg";

// a pet function; please ignore this
router.get("/", async (req, res) => {
  const { auth, authClient, sheets } = await authSheets(CRED_FILE);
  const getRows = await sheets.spreadsheets.values.get({
    SHEET_ID,
    range: "Sheet1!A1:E",
  });
  res.send(getRows.data);
});

router.post("/login", async (req, res) => {});

router.post("/register", async (req, res) => {
  // maybe use this after registering from the frontend: Auth0
  // then just update infos here for record keeping

  // perform data cleaning and validation for the posted data
  const newUser = req.body;

  // create a new row in the spreadsheet

  const { auth, authClient, sheets } = await authSheets(CRED_FILE);
  const newRow = await sheets.spreadsheets.values.append({
    SHEET_ID,
    range: SHEET_NAME,
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [newUser],
    },
  });
});

router.put("/update", async (req, res) => {
  // perform data cleaning and validation for the posted data
  // know what field is updated and do the updates in iterative fashion
  const updatedUser = req.body;

  // update a row in the spreadsheet

  const { auth, authClient, sheets } = await authSheets(CRED_FILE);
  const newRow = await sheets.spreadsheets.values.update({
    SHEET_ID: "1IfBG0PgM3v4pf5UBcqwQo3EogqsieCdNG1BLEz9zEFg",
    range: `${SHEET_NAME}!E2`,
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [updatedUser],
    },
  });
});

module.exports = router;
