const router = require('express').Router();
const {
    getUsers,    
  } = require('../../controllers/userController');

  // Get User information for Friend route
  router.route('/').get(getUsers);

  module.exports = router;