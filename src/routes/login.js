const express = require('express');
const passport = require("passport");
const router = express.Router();

router.post(
    "/log-in",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/"
    })
);

module.exports = router;
