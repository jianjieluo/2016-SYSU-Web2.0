var express = require("express")
var router = express.Router()

router.get("/", function(req, res) {
    res.render("regist");
});

router.post('/', function(req, res, next) {
    // begin to regist
});

module.exports = router
