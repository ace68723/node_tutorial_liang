var express 	= require('express');
var bodyParser 	= require('body-parser');
var cors 		= require('cors');
var userLogin 	= require('./models/userLogin')

var app 		= express();


app.use(cors());
app.use(bodyParser.json());

// userLogin.test(6)
// 	.then(function(result) {
// 		console.log(result)
// 	})
// 	.catch(function(error) {
// 		console.log(error)
// 	});





// userLogin.test2();

app.listen(3000,function() {
	console.log('node_test listening on 3000');
});

app.get('/get',function(req,res) {
	res.send({hello:'world'});
})

app.post('/post',function(req,res) {
	var post = req.body;
	console.log(post);
	res.send(post);
})

app.post('/login',function(req,res) {
	var data = req.body;
	console.log(data);
	
	var email = data.email;
	var password = data.password;
	
	console.log(email);

	userLogin.firebase_login(email,password)
		.then(function(result) {
			console.log(result)
			res.status(200).send(result);
		})
		.catch(function(error) {
			console.log(error)
			res.status(401).send(error);
		})	
})

app.post('/token',function(req,res) {
	var data = req.body;
	console.log(data);
	
	var token = data.token;
	
	console.log(token);

	userLogin.firebase_token(token)
		.then(function(result) {
			console.log(result)
			res.status(200).send(result);
		})
		.catch(function(error) {
			console.log(error)
			res.status(401).send(error);
		})	
})

app.post('/register',function(req,res) {
	var data = req.body;
	console.log(data);

	var email = data.email;
	var password = data.password;

	userLogin.firebase_register(email,password)
		.then(function(result) {
			console.log(result)
			res.status(200).send(result);
		})
		.catch(function(error) {
			console.log(error)
			res.status(401).send(error);
		});

})








