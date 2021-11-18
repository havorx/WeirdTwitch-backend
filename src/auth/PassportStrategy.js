// PassportJS LocalStrategy
// import passportLocal from 'passport';
// import LocalStrategy from 'passport-local';
import passport from 'passport';
import passportJWT from 'passport-jwt';
import User from '../models/User.js';
import session from 'express-session';

export default function initializeStrategy(app) {
  // Authentication
  /*  passportLocal.use(
        new LocalStrategy((username, password, done) => {
          User.findOne({username: username}, (err, user) => {
            if (err) {
              return done(err);
            }
            if (!user) {
              return done(null, false, {message: 'Incorrect username'});
            }
            if (user.password !== password) {
              return done(null, false, {message: 'Incorrect password'});
            }
            return done(null, user);
          });
        }),
    );

    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
        done(err, user);
      });
    });*/

  passport.use(User.createStrategy());

  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

  const JWTStrategy = passportJWT.Strategy;
  const ExtractJwt = passportJWT.ExtractJwt;
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  };

// Used by the authenticated requests to deserialize the user,
// i.e., to fetch user details from the JWT.
  passport.use(
      new JWTStrategy(opts, function(jwt_payload, done) {
        User.findOne({_id: jwt_payload._id}, function(err, user) {
          if (err) {
            return done(err, false);
          }
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      }),
  );

  app.use(session({secret: 'cats', resave: false, saveUninitialized: true}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
  });
}

