require("dotenv").config();
const db = require("better-sqlite3")(process.env.DBNAME);
const { hashPassword } = require("./AuthService");
const bcrypt = require("bcrypt");

const getAllUsers = () => {
  const query = `SELECT id,Name,email,created_at FROM Users`;
  const rows = db.prepare(query).all();
  return rows;
};

const register = body => {
  var { username, email, password } = body;
  password = hashPassword(password);
  const now = new Date();
  const query = `INSERT INTO Users(username,email,password,created_at) 
    VALUES(?,?,?,?,?)`;
  const result = db
    .prepare(query)
    .run(username, email, password, now.toISOString());
  if (result.changes === 0) {
    throw new Error("An Error occured while creating a new Staff Member");
  }
};

module.exports ={ getAllUsers, register };