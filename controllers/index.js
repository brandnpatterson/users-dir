const { sequelize, User } = require("../models");

// Create User
exports.postUser = (req, res) => {
  User.findOrCreate({
    where: {
      username: req.body.username
    },
    defaults: {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      jobtitle: req.body.jobtitle,
      location: req.body.location,
      username: req.body.username
    }
  })
    .then(result => {
      const user = result[0];
      const created = result[1];

      if (!created) {
        return res
          .status(403)
          .json({ error: "User already exists with that username" });
      }

      let person = "";
      if (Math.random() >= 0.5) {
        person = "wo";
      }

      console.log(result);

      User.update(
        {
          picture: `https://randomuser.me/api/portraits/med/${person}men/${
            user.id
          }.jpg`
        },
        { where: { id: user.id } }
      ).then(() => res.json(user));
    })
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
  User.findOne({
    where: {
      id: req.params.userId
    }
  })
    .then(user => res.json(user))
    .catch(err => res.json(err));
};

// Update User by id
exports.updateUserById = (req, res) => {
  User.update(
    {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      jobtitle: req.body.jobtitle,
      location: req.body.location,
      picture: req.body.picture,
      username: req.body.username
    },
    {
      where: {
        id: req.params.userId
      }
    }
  )
    .then(user => res.status(200).json({ message: "User has been updated" }))
    .catch(err => res.json(err));
};

// Delete User by id
exports.deleteUserById = (req, res) => {
  User.destroy({
    where: {
      id: req.params.userId
    }
  })
    .then(() => res.status(200).json({ message: "User has been deleted" }))
    .catch(err => res.json(err));
};
