const express = require('express');
const router = express.Router()

const {createUser,followUser,unfollowUser, getUsers, getUser } = require('../controllers/users');

router.post('/', createUser);
router.put('/:id/follow', followUser);
router.put('/:id/unfollow', unfollowUser);
router.route('/').get(getUsers);
router.route('/:id').get(getUser);


module.exports = router;