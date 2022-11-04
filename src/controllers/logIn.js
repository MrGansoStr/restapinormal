const connectDB = require('../db.js');

const logIn = async (req, res) => {
  const connection = await connectDB();
  let user = {...req.body};
  let [ result ] = await connection.query(`SELECT * FROM users WHERE username='${user.username}'`);
  console.log(result)
  res.status(200).json(result)
};

module.exports = logIn;