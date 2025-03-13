const axios = require('axios');

// Call the LOGIN endpoint
const loginCommand = async (username, password) => {
  // make a request to the server to authenticate the user
  const response = await fetch('http://localhost:3000/LOGIN', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });

  if (response.ok) {
    console.log('Successfully logged in!');
    return true;
  } else {
    console.log('Invalid username or password!');
    return false;
  }
};

// Call the CREATE endpoint
const createCommand = (stmt) => {
  axios
    .post('http://localhost:3000/CREATE', { query: stmt })
    .then((res) => {
      if (res.status === 200) {
        console.log(`Collection created successfully in ${res.data.DBname}!`);
      } else if (res.status === 400) {
        console.log('Invalid query!');
      } else if (res.status === 500) {
        console.log('An error occurred on the server!');
      } else {
        console.log('An error occurred!');
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

// Call the INSERT endpoint
const insertCommand = (stmt) => {
  axios
    .post('http://localhost:3000/INSERT', { query: stmt })
    .then((res) => {
      if (res.status === 200) {
        console.log(`Inserted ${res.data.values.length} records successfully!`);
      } else if (res.status === 400) {
        console.log('Invalid query!');
      } else if (res.status === 500) {
        console.log('An error occurred on the server!');
      } else {
        console.log('An error occurred!');
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

// Call the READ endpoint
const readCommand = (stmt) => {
  axios
    .post('http://localhost:3000/READ', { query: stmt })
    .then((res) => {
      if (res.status === 200) {
        console.log(res.data);
      } else if (res.status === 400) {
        console.log('Invalid query!');
      } else if (res.status === 500) {
        console.log('An error occurred on the server!');
      } else {
        console.log('An error occurred!');
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

//  Call the DELETE endpoint
const deleteCommand = (stmt) => {
  axios
    .post('http://localhost:3000/DELETE', { query: stmt })
    .then((res) => {
      if (res.status === 200) {
        console.log(`Deleted ${res.data.deletedCount} records successfully!`);
      } else if (res.status === 400) {
        console.log('Invalid query!');
      } else if (res.status === 500) {
        console.log('An error occurred on the server!');
      } else {
        console.log('An error occurred!');
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

//  Call the UPDATE endpoint
const updateCommand = (stmt) => {
  axios
    .post('http://localhost:3000/UPDATE', { query: stmt })
    .then((res) => {
      if (res.status === 200) {
        console.log(`Updated ${res.data.modifiedCount} records successfully!`);
      } else if (res.status === 400) {
        console.log('Invalid query!');
      } else if (res.status === 500) {
        console.log('An error occurred on the server!');
      } else {
        console.log('An error occurred!');
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = {
  loginCommand,
  createCommand,
  insertCommand,
  readCommand,
  deleteCommand,
  updateCommand,
};
