const UserController = require('../controllers/user');
const { Router } = require('express');
const authMiddleware = require('../middleware/isAuth');
const router = Router();

router.post('/signup', UserController.SignUp);
router.post('/login', UserController.login);
router.get('/profile/:id', authMiddleware.isAuth, UserController.getUserById);

module.exports = router;
