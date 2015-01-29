
var sys = require("sys");
var http = require('http');
var url = require('url');
var querystring = require('querystring');
var notp = require('notp');
var crypto = require('crypto');
var thirtyTwo = require('thirty-two');
var assert = require('assert');
var qr = require('qr-image'); 
var express = require('express');
var app = express();
var morgan = require('morgan');

app.use(morgan('combined'));
app.get('/new/:key?',  genKeyPage);
app.get('/check/:key',  checkTokenPage);
app.get('/get/:key',  getTokenPage);
app.listen(process.env.PORT);  


/*
if no req.params.key was passed, create a random string to use as key
return QR code for key
*/

function genKeyPage(req, res) {
 	var key = req.params.key || Math.random().toString(16).slice(2);
	var b32 = thirtyTwo.encode(key.toString());
	var encodedForGoogle = b32.toString().replace(/=/g,'');
	res.type( "text/html");  
	res.status(200);
	var uri =  'otpauth://totp/'+key+'?secret=' + encodedForGoogle;
	var response = "<html><title>2FA Test Client</title><body><p>Key: <span>"+key+"</span></p><p>Secret: <span>"+encodedForGoogle+
	"</span></p><img src='http://qrcode.kaywa.com/img.php?s=8&d="+uri+"' /></body></html>"
	res.send(response);
	/*
	originally the service just returned the QR code, locally generated
	*/
	//res.type( "image/png");  
	//var code = qr.image(uri, { type: 'png' });
	//code.pipe(res);
};

//Fetch a token for a TOTP
function getTokenPage(req, res) {
	
	if(req.params.key) {
		var token = notp.totp.gen(req.params.key);
		res.status(200);
		res.type("text/plain");
		res.send(token);

	} else {
		res.status(400);
		res.type("text/plain");
		res.send("Error 400: Get token method requires a key");
	}
};

//Check a TOTP token against a known secret
function checkTokenPage(req, res) {
	
	if((req.params.key) && (req.query.token)) {
		var result = notp.totp.verify(req.query.token, req.params.key, {});
	
		if(result) {
			res.status(200);
			res.type("text/plain");
			res.send("OK");
		} else {
			res.status(401);
			res.type("text/plain");
			res.send("Error 401: Invalid token.");
		}
		

	} else {
		res.status(400);
		res.type("text/plain");
		res.send("Error: Check token method requires a key and token");
	}
};



