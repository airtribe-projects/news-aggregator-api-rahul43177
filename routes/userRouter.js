const express = require("express");
const { signUp, login, preferences , updatePreferences} = require("../controller/userController");
const authenticateToken = require("../middlewares/authMiddleware");
const router = express.Router()

router.post("/signup" , signUp); 
router.post("/login" , login)
router.get("/preferences" , authenticateToken , preferences)
router.put("/preferences" , authenticateToken , updatePreferences)


module.exports = router; 