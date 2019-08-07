var express = require('express');
var router = express.Router();

/* GET home page. */
app.get('/',function(req,res) {
	res.render(path.join(__dirname, './', '/views/index.ejs'));
});

module.exports = router;
