var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var PORT = process.env.PORT || 3000;
var sql_input;
var connection = mysql.createConnection({
	host: 'u0zbt18wwjva9e0v.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
	database: 'now508ri6icfrha8',
	user: 'po5iadngccummra9',
	password: 'ug11wvyctttxcobb'
});

var app = new express();

var urlencodedParser = bodyParser.urlencoded({extended: false});

// view engine setup
app.use('./public',express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').renderFile);
//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

//ROUTES
app.all('/', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '');
    res.header('Access-Control-Allow-Headers', 'Content-Type,accept,access_token,X-Requested-With');
    next();
});
app.get('/',function(req,res) {
	res.render(path.join(__dirname, './', '/views/index.ejs'));
});
app.get('/search',function(req,res) {
	res.render(path.join(__dirname, './', '/views/index.ejs'));
});
app.post('/search',function(req,res){
	var string = req.body.SID;
	var clean = sanitize(string);
	var output = '';
	var qry = "select a.pageurl, a.pagecontent, a.frequency from (select TID from searchTerms where term = '" + 
	clean + "') as b, (select searchResults.RID, searchResults.pageurl, searchResults.pagecontent, termFrequency.frequency, termFrequency.TID from termFrequency, searchResults where termFrequency.RID = searchResults.RID) as a where b.TID = a.TID;";
	connection.query(qry, function(error, results) {
		if (error)
			throw error;
		results.forEach(re => {
			console.log(re.pageurl);
			output += '<div><a href = " '  + re.pageurl + ' "><h4>' + re.pageurl + '</h4><br>' + re.pagecontent + '</a></div>';
		});
		res.render(path.join(__dirname, './', '/views/index.ejs'), {result:output});
	});
});

app.listen(PORT, () => {
	console.log("Listening on port " + PORT);
});

function sanitize(str){
	str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
    return str.trim();
}

//module.exports = app;