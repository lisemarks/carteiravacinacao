const express = require('express')
const app = express()
const port = 3333

app.use(express.json())

const routing = require('./src/router/routing')

app.use(routing)

app.use(function (err, req, res, next) {
  res.status(err.httpStatusCode || 500).json({code: err.code, message: err.message})
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})