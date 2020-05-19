const express = require('express')
var cors = require('cors')
const app = express()
const port = 3000

app.use(cors())

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))


const mysqlConnection = require('./mysql')


app.post('/login', (req, res) => {
  mysqlConnection.query('SELECT * FROM users', (err, results) => {
    res.status(200).send(results)
  })
})