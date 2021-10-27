const indexRouter = require('./index');
const loginRouter = require('./login');
const signupRouter = require('./signup');
const usersRouter = require('./users');

function route(app) {
    app.use('/', indexRouter);
    app.use('/login', loginRouter);
    app.use('/signup', signupRouter);
    app.use('/users', usersRouter);
}

module.exports = route;
