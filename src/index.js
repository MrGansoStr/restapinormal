const morgan = require('morgan');
const express = require('express');
const cors = require('cors');

const connectDB = require('./db.js');
const config  = require('./config.js');

const logIn = require('./controllers/logIn.js');
const Register = require('./controllers/register.js');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

const corsOptions = {
  origin: true,
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.get('/', (req, res) => {
  res.json('Home page Normal REST API');
});

app.get('/users', async (req, res) => {
  const connection = await connectDB();
  const [ result ] = await connection.query('SELECT * FROM users');
  res.json(result);
  //console.log(result.length);
});

app.post('/login', logIn);

app.post('/register', Register);

app.use((req, res, next) => {
  res.status(404).json({
    message: "No encontrado"
  })
});

porti = config.puerto

const port = process.env.PORT || porti;
app.listen(port)
console.log(`Listening on PORT: ${porti}`);