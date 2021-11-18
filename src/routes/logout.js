import express from 'express';
const router = express.Router();

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

export default router;
