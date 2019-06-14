const express = require("express");
const router = express.Router();
const { postUser, getUsers, getUserById } = require("../controllers");

router.post("/user", postUser);
router.get("/users", getUsers);
router.get("/users/:userId", getUserById);

module.exports = router;
