const { sequelize, User } = require("../models");

// Create User
exports.postUser = (req, res) => {
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    jobTitle: req.body.jobTitle,
    location: req.body.location,
    picture: req.body.picture
  })
    .then(user => {
      res.json({ user });
    })
    .catch(error => {
      res.json({ error });
    });
};

// Get all Users
exports.getUsers = (req, res) => {
  User.findAll().then(users => res.json(users));
};

// Get User by id
exports.getUserById = (req, res) => {
  User.findByPk(req.params.userId).then(user => res.json(user));
};
