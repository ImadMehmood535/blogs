const express = require("express");
const authController = require("../controller/authController")
const router = express.Router();

//testing


//registeration
router.post("/register", authController.register)
router.post("/login", authController.login)

module.exports = router;