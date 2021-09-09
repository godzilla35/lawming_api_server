var _ = require("lodash");
var express = require("express");
var router = express.Router();
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

var passport = require("passport");
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

const { User } = require('../models');

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'mysecretword';

var strategy = new JwtStrategy(jwtOptions, async function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  const exUser = await User.findOne({where : {id: jwt_payload.id}});

  if(exUser) {
    next (null, exUser);
  } else {
    next (null, false);
  }
});

passport.use(strategy);

var app = express();
app.use(passport.initialize());

// parse application/x-www-form-urlencoded
// for easier testing with Postman or plain HTML forms
app.use(express.urlencoded({
  extended: true
}));

// parse application/json
app.use(express.json())

router.get("/", function(req, res) {
  res.json({message: "The app is running!"});
});

router.post('/join', async (req, res, next) => {
  const { email, nick, password } = req.body;
  try {
    
    const exUser = await User.findOne({ where: { email } });
    
    if (exUser) {
      return res.status(400).json({
        code: 400,
        message: "exist user!"
      });
    }

    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick,
      password: hash,
    });

    return res.status(200).json({
      code: 200,
      message: "join success!"
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post("/login", async function(req, res) {
  const { email, password } = req.body;
  console.log(`===### email: ${email} password: ${password}`);

  // usually this would be a database call:
  const user = await User.findOne({ where: { email } });

  if (user) {
    //console.log(user);
    console.log(`===### user.password: ${user.password}`);
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      var payload = { id: user.id };
      console.log(`===### user.id: ${user.id}`);
      var token = jwt.sign(payload, 
        jwtOptions.secretOrKey, 
        {
          expiresIn: '7d',
          issuer: 'lawming',
        });
      res.json({ message: "ok", token });
    } else {
      res.status(401).json({ message: "invalid credentials" });
    }
  } else {
    console.log(`===### no such user`);
    res.status(401).json({ message: "no such user found" });
  }
});

router.get("/secret", passport.authenticate('jwt', { session: false }), function(req, res){
  res.json({message: "Success!"});
});

router.get("/secretDebug",
  function(req, res, next){
    console.log(req.get('Authorization'));
    next();
  }, function(req, res){
    res.json("debugging");
});

module.exports = router;
