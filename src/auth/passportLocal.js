// PassportJS LocalStrategy
const passportLocal = require("passport");
const LocalStrategy = require("passport-local");
const passport = require("passport");
passportLocal.use(
    new LocalStrategy((username, password, done) => {
        User.findOne({username: username}, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {message: "Incorrect username"});
            }
            if (user.password !== password) {
                return done(null, false, {message: "Incorrect password"});
            }
            return done(null, user);
        });
    })
);

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

module.exports = passportLocal;
