const express = require('express');
const router = express.Router();
const User = require('../models/Users');

router.post("/", (req, res, next) => {
    const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        passwordConf: req.body.passwordConf
    }).save(err => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
    console.log(user);
});

module.exports = router;
