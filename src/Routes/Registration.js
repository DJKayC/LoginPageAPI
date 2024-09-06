const express = require("express");
const router = express.Router();
const { register, getAllUsers} = require("../Services/register");
const { authenticate, authorize } = require("../Services/AuthService");
const { tryCatch } = require("../Services/utils/TryCatch");
const { validateUser} = require("../Services/utils/Validator");

router.get(
    "/api/users",
    authenticate,
    authorize,
    tryCatch((req, res) => {
      const data = getAllUsers();
      return res.status(200).json({
        user: data
      });
    })
  );
  
  router.post(
    "/api/staff",
    authenticate,
    authorize,
    validateUser,
    tryCatch((req, res) => {
      const body = req.body;
      register(body);
      return res.status(201).json({
        message: "User Was Succesfully created"
      });
    })
  );

module.exports = router;