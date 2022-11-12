const connectDB = require('../db.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logIn = async (req, res) => {
  
  try {
    let user = {...req.body};
    if(!(user.username && user.password)) {
      res.status(400).send("All inputs is required");
    }
    const connection = await connectDB();
    
    let [ result ] = await connection.query(`SELECT username FROM users WHERE username='${user.username}'`);
    //console.log(result)
    if(result.length == 0) {
      return res.status(401).json("Invalid Username or Password");
    }
    else{
      let [ vresult ] = await connection.query(`SELECT username, password, email FROM users WHERE username ='${user.username}'`);
      if(vresult.length == 0) {
        return res.status(401).json("Invalid Username or Password");
      }
      else {
        await bcrypt.compare(user.password, vresult[0].password, (err, ok) => {
          if(!err && ok ){
            const token = jwt.sign({name: user.username},"secretkeyxd", {
              expiresIn: "10m",
            });
            console.log(vresult);
            vresult.push({"message": "Login Successfully","accessToken": token, "expiresIn": "10 min"})
            res.status(200).send(vresult);
          }
          else {
            res.status(401).send({"message": "Invalid Username or Password"});
          }
        });
      }
      return;
    }
    
  } catch (error) {
    res.status(400);
    return console.log(error).json();
  }
};

module.exports = logIn;