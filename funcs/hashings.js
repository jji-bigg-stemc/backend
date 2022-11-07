// put all the hashing operations here as functions

const crypto = require("crypto");

const hashPassword = (password) => {
  const salt = process.env.SALT || "salt";
  const hashedPassword = hash(password + salt);
  return { salt, hashedPassword };
};

module.exports = { hashPassword };
