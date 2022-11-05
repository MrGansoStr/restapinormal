const connectDB = require('../db.js');

const Register = async (req, res) => {
  let user = {...req.body}
  try {
    const connection = await connectDB();
    let [ result ] = await connection.query(`SELECT username FROM users WHERE username = '${user.username}'`);
    if(result.length > 0) {
      return res.status(422).send({message: "Usuario ya en uso"});
    }
    else {
      let [ newresult ] = await connection.query(`INSERT INTO users (username, password, email) 
      VALUES ('${user.username}', '${user.password}', '${user.email}')`);
      //console.log(newresult);
      //res.json(newresult);
      return res.send("Register Successfully").json();
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Algo paso Intentelo de nuevo mas tarde");
  }
};

module.exports = Register;