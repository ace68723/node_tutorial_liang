var express = require('express');
var request = require("request");
var bodyParser 	= require('body-parser');

var node_test = express();

node_test.use(bodyParser.json());

node_test.listen(3030,function() {
	console.log("node_test listening on 3001");
});

var test = function() {
	var rand = Math.floor(Math.random() * 1000000)
	var url = 'http://www.puti.org/ch/' +'?r='+rand+"=asdf";
	// console.log(url)

 //发送请求
    request(url, function(error, response, body) {
        console.log(error)
        if(!error && response.statusCode == 200) {
            // console.log(body);
        }
    });
};

// test();

setInterval(test, 200)