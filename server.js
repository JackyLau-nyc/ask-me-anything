const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const URL = "https://en.wikipedia.org/wiki/Wikipedia";

request(URL, function (err, res, body) {
	if(err){
		console.log(err, "error occured while hitting URL");
	}
	else {
		const arr = [];
		let $ = cheerio.load(body); //Loading of complete HTML body
		$('h1').each(function(index, header1){
			const term = $(header1.text());
			console.log(term);
		});
		$('h2').each(function(index, header2){
			const term = $(header2.text());
			console.log(term);
		});
		$('h3').each(function(index, header3){
			const term = $(header3.text());
			console.log(term);
		});
		$('h4').each(function(index, header4){
			const term = $(header4.text());
			console.log(term);
		});
		$('h5').each(function(index, header5){
			const term = $(header5.text());
			console.log(term);
		});
		$('h6').each(function(index, header6){
			const term = $(header6.text());
			console.log(term);
		});
		$('a').each(function(index, atag){
			const link = $(atag).attr('href');
			const name = $(atag).text();
			let object = {
					link : link,
					name : name,
			}
			console.log(atag);
			arr.push(JSON.stringify(object));
		});
		console.log(arr.toString());
		fs.writeFile('data.txt', arr, function(err) {
			if(err) {
				console.log(err);
			}
			else {
				console.log("success");
			}
		});
	}
});
