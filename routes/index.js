const express = require("express");
const router = express.Router();
const {
  postUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById
} = require("../controllers");

router.post("/users", postUser);
router.get("/users", getUsers);
router.get("/users/:userId", getUserById);
router.put("/users/:userId", updateUserById);
router.delete("/users/:userId", deleteUserById);

module.exports = router;
