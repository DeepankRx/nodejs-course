const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routers/user');
const app = express();

const port = 3000;
app.use(express.json());
mongoose.connect(
  'mongodb+srv://suresh123:suresh123@cluster0.hhlk7.mongodb.net/nodejs-2?retryWrites=true&w=majority'
);
mongoose.connection.on('open', () => console.log('Connected to db'));
mongoose.connection.on('error', (err) => {
  console.log(err);
});

app.use('/api', userRouter);

//method to run server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//password -> hash
// jwt token
//otp apis