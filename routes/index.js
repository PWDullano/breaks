require('dotenv').load()
var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var request = require('request');
var jwt = require('jsonwebtoken');

function Users(){
  return knex('users')
}
function Moves(){
  return knex('moves')
}
function Session(){
  return knex('sessions');
}
function createToken(user){
  return jwt.sign(user, process.env.TOKEN_SECRET)
}
function verifyToken(user){
  return jwt.verify(user, process.env.TOKEN_SECRET)
}

router.post('/auth/facebook', function(req,res){
  var fields = ['id', 'email', 'first_name', 'last_name', 'name'];
  var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
  var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
  var params = {
  code: req.body.code,
  client_id: req.body.clientId,
  client_secret: process.env.FACEBOOK_SECRET,
  redirect_uri: req.body.redirectUri
 };
   request.get({ url: accessTokenUrl, qs: params, json: true }, function(err, response, accessToken) {
      if (response.statusCode !== 200) {
        return res.status(500).send({ message: accessToken.error.message });
      }
      request.get({ url: graphApiUrl, qs: accessToken, json: true }, function(err, response, profile) {
        if (response.statusCode !== 200) {
          return res.status(500).send({ message: profile.error.message });
        }
          var user = {}
          user.facebook_id = profile.id
          user.profile_image_url = 'https://graph.facebook.com/'+profile.id+'/picture?type=large'
          user.email = profile.email
          user.first_name = profile.first_name
          user.last_name = profile.last_name
          user.name = profile.name
          var token = createToken(user)
          Users().insert(user)
            .catch(function(error){
              console.log(error);
            }).then(function(){
              res.send({token: token})
              console.log(user);
              res.redirect('/users')
            })
      })
    });
})

router.post('/users', function(req,res){
    var token = req.body.token
    var user = verifyToken(token)
    Users().where('facebook_id', user.facebook_id).first().then(function(result){
    res.send(result)
  })
})

router.get('/moves', function(req, res, next) {
  Moves().select().then(function(payload){
    res.json(payload);
  })
});

router.get("/sessions", function(req,res){
   Session().select().then(function(payload){
     res.json(payload);
   });
});

router.get("/sessions", function(req,res){
   Session().where({id: req.params.id}).then(function(payload){
     res.json(payload);
   });
});

router.post('/sessions', function(req, res){
  var session = {}
  session.facebook_id = req.body.facebook_id;
  session.date = req.body.date
  session.focus = req.body.focus
  Session().insert(session).then(function(){
    res.json({success:true})
  })
})

module.exports = router;
