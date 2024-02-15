const express = require('express');
const mongoose = require('mongoose');
//  1. Create an instance of the Express application
const app = express();

const port = 3001;

//method to run server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
 // mongodb+srv://deepank:<password>@cluster0.wopim.mongodb.net/?retryWrites=true&w=majority
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
  city: {
    default: 'Aligarh',
    type: String,
  },
});
// ('table name',structureOfTable)
const User = mongoose.model('user', userSchema);
app.use((req, res, next) => {
  console.log('middleware');
  next();
});
app.use(express.json());
app.post('/create', async (request, response) => {
  try {
    // const usr = request.body.username;
    // const psd = request.body.password;
    const { username: usr, password: psd, city } = request.body;
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
      city,
    });

    return response.status(200).json({ message: 'User created', data: user });
  } catch (error) {
    return response.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
});

app.get('/all', async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      message: 'Users fetched successfully!',
      data: users,
    });
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

app.get('/user/condition', async (req, res) => {
  const condition = req.query;
  // const { username } = req.body;
  // if (!username) {
  //   return res.status(400).json({
  //     message: 'Please enter username',
  //   });
  // }
  console.log(req.query);
  const users = await User.find({
    city: 'Aligarh',
  });
  if (users.length === 0) {
    return res.status(400).json({
      message: 'No user found',
    });
  }
  return res.status(200).json({
    data: users,
  });
});

app.get('/user/:id', async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);
  return res.status(200).json({
    data: user,
  });
});
app.get('/user/one/:city', async (req, res) => {
  const { city } = req.params;
  const user = await User.findOne({
    city,
  });
  return res.status(200).json({
    data: user,
  });
});
app.put('/user/update/:city', async (req, res) => {
  const { city } = req.params;
  const { username } = req.body;
  //1 condition
  const user = await User.updateMany(
    {
      city, //condition
    },
    {
      username, //updated data
    },
    {
      new: true, //optional
      runValidators: true,
    }
  );
  return res.status(200).json({
    data: user,
  });
});
// app.put('/user/update/:city', async (req, res) => {
//   const { city } = req.params;
//   const { username } = req.body;
//   const user = await User.findByIdAndUpdate(
//     {
//       city,
//     },
//     {
//       username,
//     },
//     {
//       new: true,
//     }
//   );
//   return res.status(200).json({
//     data: user,
//   });
// });

app.delete('/user/delete/:id', async (req, res) => {
  const { id } = req.params;
  const user = await User.deleteMany(id);
  return res.status(200).json({
    data: user,
  });
});
