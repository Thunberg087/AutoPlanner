const express = require('express')
const router = express.Router()
const axios = require('axios')
const querystring = require('querystring');

const mysqlConnection = require('./../../mysql')

let accessToken = null

router.post('/getToken', async function (req, res) {
  const token = await getAccessToken()
  res.send(token)
})

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
          "Authorization": "Bearer " + accessToken
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


module.exports = router;