const express = require("express");
const router = express.Router();
const { tryCatch, tryCatchAsync } = require("../Services/utils/TryCatch");
const { register, validateLogin, authenticate} = require("../Services/AuthService");
const { validateUser } = require("../Services/utils/Validator");

router.post("/api/auth/register", authenticate, validateUser,
  tryCatch((req, res) => {
    const body = req.body;
    register(body);
    return res.status(201).json({
      message: "User created"
    });
  })
);

router.post(
  "/api/auth/login",
  tryCatchAsync(async (req, res) => {
    const { username, password } = req.body;
    const { valid, result } = await validateLogin(username, password);
    if (!valid) {
      return res.status(401).json({
        message: "Invalid Username or Password"
      });
    }
    return res.status(200).json(result);
  })
);

module.exports = router;