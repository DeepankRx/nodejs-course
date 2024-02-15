const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.SignUp = async (req, res) => {
  try {
    const { username, name, password, email, phoneNumber } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword);
    const user = await User.create({
      username,
      name,
      password: hashPassword,
      email,
      phoneNumber,
    });
    user.password = null;
    return res.status(200).json({
      data: user,
      message: 'Signup successful',
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: 'Something went wrong!',
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      username,
    }).select('+password');
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }
    console.log(user);
    //compare
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (isPasswordMatch) {
      const token = jwt.sign(
        {
          UserId: user._id,
          role: '',
        },
        'my-secret',
        { expiresIn: '3h' }
      );
      return res.status(200).json({
        message: 'User logged in successfully',
        data: { token },
      });
    }
    return res.status(400).json({
      message: 'Your password is incorrect',
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: 'Something went wrong!',
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }
    return res.status(200).json({
      message: 'User found successfully!',
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: 'Something went wrong!',
    });
  }
};
