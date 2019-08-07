const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
var iter = 0;
const URL = "https://www.google.com";
const arr = [];
var mysql = require('mysql');
var sql_input;
var connection = mysql.createConnection({
	host: 'u0zbt18wwjva9e0v.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
	database: 'now508ri6icfrha8',
	user: 'po5iadngccummra9',
	password: 'ug11wvyctttxcobb'
});

function extract(err, res, body) {
	if(err){
		console.log(err, "error occured while hitting URL");
	}
	else {
		let $ = cheerio.load(body); //Loading of complete HTML body
		$('h1').each(function(index, header1){
			const term = $(header1).text();
			console.log(term);
		});
		$('h2').each(function(index, header2){
			const term = $(header2).text();
			console.log(term);
		});
		$('h3').each(function(index, header3){
			const term = $(header3).text();
			console.log(term);
		});
		$('h4').each(function(index, header4){
			const term = $(header4).text();
			console.log(term);
		});
		$('h5').each(function(index, header5){
			const term = $(header5).text();
			console.log(term);
		});
		$('h6').each(function(index, header6){
			const term = $(header6).text();
			console.log(term);
		});
		$('a').each(function(index, atag){
			const link = $(atag).attr('href');
			const name = $(atag).text();
			let object = {
					link : link,
					name : name,
			}
			console.log(object.link);
			arr.push(JSON.stringify(object));
		});
		console.log("link is : " + arr[iter].link);
		var entry = 'INSERT INTO searchResults (pageurl) VALUES("' + arr[iter].link + '")';
		var qry = connection.query(entry, function(err,result){
			console.log(result);
            if (err) throw err;
		});
		request(arr[iter++].link, (err, res, body) => { extract(err,res,body)});
	};
}

function cycleURL(err, res) {
	if(err){
		console.log(err, "error occured while hitting URL");
	}
	else {
 		
	}
}

request(URL, (err, res, body) => { extract(err,res,body)});