const morgan = require('morgan');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.json('Home page Normal REST API');
})

app.use((req, res, next) => {
  res.status(404).json({
    message: "No encontrado"
  })
})

const port = process.env.PORT || 9001;
app.listen(port)
console.log(`Listening on PORT: ${port}`);