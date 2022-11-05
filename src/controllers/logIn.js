const connectDB = require('../db.js');

const logIn = async (req, res) => {
  try {
    const connection = await connectDB();
    let user = {...req.body};
    let [ result ] = await connection.query(`SELECT username FROM users WHERE username='${user.username}'`);
    //console.log(result)
    if(result.length == 0) {
      return res.status(401).json("Invalid Username or Password");
    }
    else{
      let [ vresult ] = await connection.query(`SELECT username, password, email FROM users WHERE username ='${user.username}' AND password = '${user.password}'`);
      if(vresult.length == 0) {
        return res.status(401).json("Invalid Username or Password");
      }
      else {
        return res.status(200).json(vresult);
      }
      return;
    }
    
  } catch (error) {
    res.status(400);
    return console.log(error).json();
  }
};

module.exports = logIn;