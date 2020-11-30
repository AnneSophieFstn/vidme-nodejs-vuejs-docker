const db = require("../models");
const Room = db.room;
const jwt = require("jsonwebtoken")
const Op = db.Sequelize.Op;

// Create and Save a new Room
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.nom && !req.body.adminId) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const jwtKey = "my_secret_key"
//   const jwtExpirySeconds = 300

	// Create a new token with the username in the payload
	// and which expires 300 seconds after issue
    const token = jwt.sign({ nom:req.body.nom }, jwtKey, {
        algorithm: "HS256",
        // expiresIn: jwtExpirySeconds,
    })
    console.log("token:", token)

  // Create a Room
  const room = {
    nom: req.body.nom,
    token: token,
    adminId: parseInt(req.body.adminId)
  };

  console.log(room)
  // Save room in the database
  Room.create(room)
    .then(data => {
        //   res.send(data);

        // set the cookie as the token string, with a similar max age as the token
        // here, the max age is in milliseconds, so we multiply by 1000
        // res.cookie("token", token, { maxAge: jwtExpirySeconds * 1000 })
        // res.cookie("token", token)
        // res.end()
        // res.render('createRoom', { title: 'Create Room' });
        res.writeHead(301,
          {Location: 'https://localhost:3002',
          'Set-Cookie': `${token}`}
        );
        res.end();
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Room."
      });
    });
};

// Retrieve all Room from the database.
exports.findAll = (req, res) => {
  const email = req.query.email;
  var condition = email ? { email: { [Op.like]: `%${email}%` } } : null;

  Room.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Rooms."
      });
    });
};

// Find a single Room with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Room.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Room with id=" + id
      });
    });
};

// Update a Room by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Room with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Room.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Room was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Room with id=${id}. Maybe Room was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Room with id=" + id
      });
    });
};

// Delete all Rooms from the database.
exports.deleteAll = (req, res) => {
  
};