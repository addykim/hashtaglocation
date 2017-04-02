const express = require('express');
const request = require('request-promise')
const router = express.Router();

const CLIENT = require('../config.json')

const INSTAGRAM_API = 'https://api.instagram.com/v1'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.marko(require('../template/index.marko', {}))
});

router.get('/login', function(req, res, next) {
  const REDIRECT_URI = 'http://localhost:3000/authorize'
  const AUTHORIZE_URL = 'https://api.instagram.com/oauth/authorize/?client_id=' + CLIENT.IG_CLIENT_ID + '&redirect_uri=' + REDIRECT_URI + '&response_type=code&scope=public_content'
  res.redirect(AUTHORIZE_URL)
})

router.get('/authorize', function(req, res, next) {
  // const code = req.params.code
  // const REQUEST_ACCESS_TOKEN_URL = 'https://api.instagram.com/oauth/access_token'
  // let options = {
  //   url: REQUEST_ACCESS_TOKEN_URL,  

  // }
  // request(options, function (error, response, body) {
  //   if (!error && response.statusCode == 200) {
  //       // Print out the response body
  //       console.log(body)
  //   } else {
  //     console.error(error)
  //   }
  // })
  // res.cookie('access_token', code).render('index')
  res.redirect('http://localhost:3000')
})

router.post('/search', function(req, res, next) {
  let hashtags = stringToArray(req.body.hashtagInput)
  let location = req.body.locationInput

  // let toEmbed = queryIGHashtag(hashtags[0])
  res.marko(require('../template/search.marko', {}))
})

// returns string if can't be done
function stringToArray(str) {
  if (typeof(str) === "string") {
    return str.split(" ")
  }
  return str
}

function queryIGHashtag(hashtag) {
  const REQUEST_URL = INSTAGRAM_API + '/tags/' + hashtag + '/media/recent?access_token=' + CLIENT.ACCESS_TOKEN
  console.log(REQUEST_URL)
  // Configure the request
  let options = {
      url: REQUEST_URL,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      json: true
  }
  
  console.log(request(options)
    .then(function(response) { 
      return response
    }).catch(function (err) {
      console.error(err)
    }))
}

function queryIGLocation(location) {

}

module.exports = router;
