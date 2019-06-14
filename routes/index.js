const express = require("express");
const router = express.Router();
const { getUsers, postUser } = require("../controllers");

router.get("/users", getUsers);
router.post("/user", postUser);

module.exports = router;
