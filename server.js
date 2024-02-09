const express = require('express');
const mongoose = require('mongoose');
//  1. Create an instance of the Express application
const app = express();

const port = 3000;

//method to run server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

mongoose.connect(
  'mongodb+srv://suresh123:suresh123@cluster0.hhlk7.mongodb.net/nodejs?retryWrites=true&w=majority'
);
mongoose.connection.on('open', () => console.log('Connected to db'));
mongoose.connection.on('error', (err) => {
  console.log(err);
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    maxLength: 10,
    minLength: 3,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: String,
});
// ('table name',structureOfTable)
const User = mongoose.model('user', userSchema);

app.use(express.json());

app.post('/create', async (request, response) => {
  try {
    const usr = request.body.username;
    const psd = request.body.password;
    if (!usr) {
      return response.status(400).json({ message: 'Please enter username' });
    }
    if (!psd) {
      return response.status(400).json({ message: 'Please enter password' });
    }
    function checkPassword(str) {
      var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      return re.test(str);
    }

    const user = await User.create({
      username: usr,
      password: psd,
    });
    
    return response.status(200).json({ message: 'User created', data: user });
  } catch (error) {
    return response.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
});

app.get('/all', (req, res) => {
  try {
    return res.status(200).json(users);
  } catch (error) {
    return response.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
});

app.put('/update', (req, res) => {
  try {
    const username = req.body.username;
    const newUsername = req.body.newUsername;
    if (!username) {
      return res.status(400).json({ message: 'Please enter username' });
    }
    if (!newUsername) {
      return res.status(400).json({ message: 'Please enter new username' });
    }
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === username) {
        users[i].username = newUsername;
        return res.status(201).json({ message: 'User updated', data: users });
      }
    }
    return res.status(400).json({
      message: 'Username not matched',
    });
  } catch (error) {
    return response.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
});

app.delete('/delete', (req, res) => {
  try {
    const username = req.body.username;

    if (!username) {
      return res.status(400).json({ message: 'Please enter username' });
    }
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === username) {
        users.splice(i, 1);
        return res.status(201).json({ message: 'User updated', data: users });
      }
    }
    return res.status(400).json({
      message: 'Username not matched',
    });
  } catch (error) {
    return response.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
});

app.get('/params/:username', (req, res) => {
  try {
    const usr = req.params.username;
    console.log(req.params);
  } catch (error) {
    return response.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
});
app.get('/query', (req, res) => {
  try {
    const usr = req.query.username;
    console.log(usr);
  } catch (error) {
    return response.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
});

app.get('/header', (req, res) => {
  try {
    const usr = req.headers;
    console.log(req.headers);
  } catch (error) {
    return response.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
});
