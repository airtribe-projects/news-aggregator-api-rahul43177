const express = require("express");
const getNews = require("../controller/newsController");
const authenticateToken = require("../middlewares/authMiddleware");
const router = express.Router(); 

router.get("/news" , authenticateToken, getNews);

module.exports = router;