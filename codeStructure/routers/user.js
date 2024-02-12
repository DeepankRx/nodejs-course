const UserController = require('../controllers/user');
const { Router } = require('express');

const router = Router();

router.post('/signup', UserController.SignUp);

module.exports = router;
