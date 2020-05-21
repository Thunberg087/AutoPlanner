const express = require('express')
var cors = require('cors')
const app = express()
const port = 3000
const axios = require('axios')
const querystring = require('querystring');

app.use(cors())

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))


const mysqlConnection = require('./mysql')


app.post('/login', (req, res) => {
  mysqlConnection.query('SELECT * FROM users', (err, results) => {
    res.status(200).send(results)
  })
})

let accessToken = null;

(async () => {
  let token = await getAccessToken()
  console.log("Token", token);
})()



async function getAccessToken() {
 
  let isValid = await checkAccessToken(accessToken)

  if (!isValid) {
    await axios.post('https://api.vasttrafik.se/token',
    querystring.stringify({
      grant_type: 'client_credentials',
    }), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Basic U3ZFYm80S0pReEZ0dUpMUEExN3JLSllocFJnYTpwRWRmTTNkSWhHblNqa2NQb3JDZE1JVTdOVmdh"
    }
  })
    .then(response => {
      accessToken = response.data.access_token
    })
    .catch(err => {
      console.log(err);
  
    });
  }
  
  return accessToken
}

async function checkAccessToken(accessToken) {
  let tempBool = false;
  await axios
  .get(
    "https://api.vasttrafik.se/bin/rest.exe/v2/location.name?input=torslanda&format=json",
    {
      headers: {
        "Authorization": "Bearer "+accessToken
      }
    }
  )
  .then(response => {
    tempBool = true;
  })
  .catch(err => {
    console.log("False");
  });

  return tempBool;
}