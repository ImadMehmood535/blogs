const express = require("express");
const authController = require("../controller/authController")
const blogController = require("../controller/blogController")
const commentController = require('../controller/commentController');

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
// get all
router.get('/blog/all', auth, blogController.getAll);

// get blog by id
router.get('/blog/:id', auth, blogController.getById);
router.put('/blog', auth, blogController.update);
router.delete('/blog/:id', auth, blogController.delete);


router.post('/comment', auth, commentController.create);

// get 
router.get('/comment/:id', auth, commentController.getById);


module.exports = router;