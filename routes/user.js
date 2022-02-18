const express = require('express');
const router = express.Router()

const {createUser, getUsers, getUser } = require('../controllers/users');

router.post('/', createUser);
router.route('/').get(getUsers);
router.route('/:id').get(getUser);


module.exports = router;