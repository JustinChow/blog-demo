const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const User = require('../models/user');
const bcrypt = require('bcryptjs');

// Password authentication strategy
passport.use(
    new LocalStrategy((username, password, done) => {
        User.findOne({ username: username }, (err, user) => {
            if (err) { 
                return done(err);
            }
            if (!user) {
                return done(null, false, { msg: "Incorrect username" });
            }
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    return done(null, user);
                }
                else {
                    return done(null, false, { msg: "Incorrect password" });
                }
            });
        });
    })
  );


  // Token authentication strategy
passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : process.env.JWT_SECRET
    },
    function (jwtPayload, done) {
        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        return done(null, jwtPayload);
    }
));