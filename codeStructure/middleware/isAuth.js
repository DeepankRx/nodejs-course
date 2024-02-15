const User = require('../models/user');
const jwt = require('jsonwebtoken');
exports.isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        error: 'Token is missing',
      });
    }
    const t = token.split(' ').pop(0);
    const decode = jwt.verify(t, 'my-secret');
    const user = await User.findById(decode.UserId);
    if (!user) {
      return res.status(404).json({
        error: 'Invalid user',
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
