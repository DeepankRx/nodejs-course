const User = require('../models/user');

exports.SignUp = async (req, res) => {
  try {
    console.log(req.body)
    const { username, name, password, email, phoneNumber } = req.body;
    const user = await User.create({
      username,
      name,
      password,
      email,
      phoneNumber,
    });
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
