require('dotenv').load()
var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function Moves(){
  return knex('moves')
}

function Session(){
  return knex('sessions');
}

router.get('/moves', function(req, res, next) {
  Moves().select().then(function(payload){
    res.json(payload);
    console.log(payload);
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
  Session().insert(req.body).then(function(){
    res.json({success:true})
  })
})

module.exports = router;
