var passport = require("passport");
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
const { Post, User} = require('../models');

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
  

  exports.isValidAPI = passport.authenticate('jwt', { session: false });