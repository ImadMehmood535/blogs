const express = require("express");
const authController = require("../controller/authController")
const blogController = require("../controller/blogController")
const router = express.Router();
const auth = require("../middleware/auth")

//testing


//registeration
router.post("/register", authController.register)
router.post("/login", authController.login)
router.post('/logout', auth, authController.logout)
router.get('/refresh', authController.refresh)

// create
router.post('/blog', auth, blogController.create);


module.exports = router;