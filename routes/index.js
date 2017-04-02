const express = require('express');
const router = express.Router();

const CLIENT = require('../config.json')
console.log(CLIENT)

const INSTAGRAM_API = 'https://api.instagram.com/v1/'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  const REDIRECT_URI = 'http://localhost:3000/authorize'
  const AUTHORIZE_URL = 'https://api.instagram.com/oauth/authorize/?client_id=' + CLIENT.IG_CLIENT_ID + '&redirect_uri=' + REDIRECT_URI + '&response_type=code'
  res.redirect(AUTHORIZE_URL)
})

router.get('/authorize', function(req, res, next) {
  const code = req.param('code')
  res.redirect('http://localhost:3000')
})

router.post('/search', function(req, res, next) {
  let hashtags = stringToArray(req.body.hashtagInput)
  let location = req.body.locationInput
  res.render('index')
})

// returns string if can't be done
function stringToArray(str) {
  if (typeof(str) === "string") {
    return str.split(" ")
  }
  return str
}

function queryIGHashTag(hashtag) {
  const REQUEST_URL = INSTAGRAM_API + '/tags/' + hashtag + '?access_token=' + CLIENT.ACCESS_TOKEN


}

function queryIGLocation(location) {

}

module.exports = router;
