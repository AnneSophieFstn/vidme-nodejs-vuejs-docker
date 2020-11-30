var express = require('express');
var router = express.Router();
const adminController = require("../controllers/adminController.js");
const roomController = require("../controllers/roomController.js");

/* GET home page. */
router.get('/test', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* Create room. */
router.get('/', function(req, res, next) {
  res.render('createRoom', { title: 'Create Room' });
});


// Create a new Admin
router.post("/admin/add", adminController.create);
// Create a new Room
router.post("/room/add", roomController.create);

module.exports = router;

