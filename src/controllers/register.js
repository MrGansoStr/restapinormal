const connectDB = require('../db.js');
const bcrypt = require('bcryptjs');
const Register = async (req, res) => {
  let user = {...req.body};
  
  try {
    const connection = await connectDB();
    const passhashed = await bcrypt.hash(user.password, 10);
    let [ result ] = await connection.query(`SELECT username FROM users WHERE username = '${user.username}'`);
    if(result.length > 0) {
      return res.status(422).send({message: "Usuario ya en uso"});
    }
    else {
      let [ newresult ] = await connection.query(`INSERT INTO users (username, password, email) 
      VALUES ('${user.username}', '${passhashed}', '${user.email}')`);
      //console.log(newresult);
      //res.json(newresult);
      return res.status(200).send({message: `Register Successfully`});
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({message: "Algo paso Intentelo de nuevo mas tarde"});
  }
};

module.exports = Register;