const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('config');
const User = require('../models/User');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.get('JWT_SECRET')
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, async (payload, done) => {
      try {
        // payload.id from decoded jwt.sign({email,id})
        const user = await User.findById(payload.id);
        console.log('PASSPORT MIDDLEWARE USER => ', user);
        if (!user) return done(null, false);

        done(null, user);
      } catch (error) {
        console.error(error.message);
        done(null, false);
      }
    })
  );
};
