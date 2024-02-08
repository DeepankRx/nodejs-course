const express = require('express');

//  1. Create an instance of the Express application
const app = express();

const port = 3000;

//method to run server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const users = [];

//middlewares
app.use(express.json());

//javascript object notation

// const obj = {
//   name: 'deepank',
//   number: 1,
//   boolean: true,
//   arr: [1, 2, 4],
//   obj1: {
//     a: 'A',
//   },
//   undefined: undefined,
//   null: null,
// };

// post , get , put , delete
//CRUD -> create , read ,update,delete

// http://localhost:3000

// const sum = (a,b)=>{

// }

//APIs
//request -> frontend  sends request to backend
//response -> backend send to frontend
app.post('/create', (request, response) => {
  console.log(request.body);
  const usr = request.body.username;
  const psd = request.body.password;
  if (!usr) {
    return response.send({ message: 'Please enter username' });
  }
  if (!psd) {
    return response.send({ message: 'Please enter password' });
  }
  users.push({
    username: usr,
    password: psd,
  });
  return response.send({ message: 'User created', data: users });
});

app.get('/all', (req, res) => {
  return res.send(users);
});
