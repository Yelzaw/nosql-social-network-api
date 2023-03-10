const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
  } = require('../../controllers/userController');

  // /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router
  .route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

// router.route('/:thoughtId/reactions').post(addReaction);

// router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;