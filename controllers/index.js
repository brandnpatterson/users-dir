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
    .then(user => res.json(user))
    .catch(err => res.json(err));
};

// Get all Users
exports.getUsers = (req, res) => {
  User.findAll()
    .then(users => res.json(users))
    .catch(err => res.json(err));
};

// Get User by id
exports.getUserById = (req, res) => {
  User.findByPk(req.params.userId)
    .then(user => res.json(user))
    .catch(err => res.json(err));
};

// Update User by id
exports.updateUserById = (req, res) => {
  User.update(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      jobTitle: req.body.jobTitle,
      location: req.body.location,
      picture: req.body.picture
    },
    {
      where: {
        id: req.params.userId
      }
    }
  )
    .then(() => res.status(200).json({ message: "User has been updated" }))
    .catch(err => res.json(err));
};

// Delete user by id
exports.deleteUserById = (req, res) => {
  User.destroy({
    where: {
      id: req.params.userId
    }
  })
    .then(() => res.status(200).json({ message: "User has been deleted" }))
    .catch(err => res.json(err));
};
