var Q 			= require('q')
var Firebase 	= require('firebase');
var FirebaseTokenGenerator = require("firebase-token-generator");
var tokenGenerator = new FirebaseTokenGenerator("OVRvSYFOJJ4BKsLGc9ieuAlzA91IF3qSEC6IASUO");

var dataRef		= new Firebase('https://liang-node-test.firebaseio.com/');
var usersRef 	= dataRef.child("users");

var test =	function(number) {
	var deferred = Q.defer();

	if (number > 5) {
		deferred.resolve('scuccess');
	} else{
		deferred.reject('error < 5');
	};

	return deferred.promise;
};
var test2 =	function() {
	console.log('usertest2');
};

var login = function(username,password) {
	var deferred = Q.defer();
	if (password == 'liangliang123') {
		deferred.resolve('success');
	} else{
		deferred.reject('fail')
	};

	return deferred.promise;
};

var firebase_login	= function(email,password) {
	var deferred = Q.defer();

		console.log(email,password);
		dataRef.authWithPassword({
		  "email": email,
		  "password": password
		}, function(error, authData) {
		  if (error) {
		    console.log("Login Failed!", error);
		    deferred.reject('fail')
		  } else {
		    console.log("Authenticated successfully with payload:", authData);
		    var token = tokenGenerator.createToken(authData);
		    deferred.resolve("Authenticated successfully with payload: " + token);
		  }
		});

	return deferred.promise;

};

function firebase_token(token){
	var deferred = Q.defer();

		dataRef.authWithCustomToken(token, function(error, authData) {
		  if (error) {
		    console.log("Login Failed!", error);
		    deferred.reject("Login Failed!" + error);
		  } else {
		    console.log("Authenticated successfully with payload:", authData);
		    deferred.resolve("Authenticated successfully with payload:");
		  }
		});
	return deferred.promise;
};

function set_user_data(userData){
	var deferred = Q.defer();

		// usersRef.child(userData.uid).set(userData);

		usersRef.child(userData.uid).set(userData, function(error) {
		  if (error) {
		   
		     deferred.reject("Data could not be saved." + error);
		  } else {
		   
		    deferred.resolve("Data saved successfully.");
		  }
		});

	return deferred.promise;
}

function firebase_register(email,password){
	
	var deferred = Q.defer();
		dataRef.createUser({
		  email: email,
		  password: password
		}, function(error, userData) {
		  if (error) {
		    switch (error.code) {
		      case "EMAIL_TAKEN":
		        console.log("The new user account cannot be created because the email is already in use.");
		        deferred.reject('The new user account cannot be created because the email is already in use.')
		        break;
		      case "INVALID_EMAIL":
		        console.log("The specified email is not a valid email.");
		        deferred.reject('The specified email is not a valid email.')
		        break;
		      default:
		        console.log("Error creating user:", error);
		        deferred.reject('"Error creating user:', error)
		    }
		  } else {
		    console.log("Successfully created user account with uid:", userData);
		    

		    set_user_data(userData)
		    	.then(function(ud_result) {
		    		console.log('1')
		    		return ud_result;
		    	})
		    	.then(function(ud_result) {
		    		var deferred = Q.defer();
		    			console.log('2')
		    			firebase_login(email,password)
    						.then(function(result) {
    							console.log('3')
    							deferred.resolve('Successfully login and created user account with uid: ' + userData.uid);
    						})
    						.catch(function(error) {
    							deferred.reject('login fail', error)
    						})
		    		return deferred.promise;

		    	})
		    	.then(function() {
		    		console.log('4')
		    		deferred.resolve('Successfully login, set data and created user account with uid: ');
    						
		    	})
		    	.catch(function(error) {
		    		 deferred.reject( error)
		    	})
		    	.finally(function() {
		    		
		    		console.log('finally')
		    	})
		   }
		});
	return deferred.promise;	
}


module.exports	=	{
	test 				:test,
	test2				:test2,
	login				:login,
	firebase_login		:firebase_login,
	firebase_register	:firebase_register,
	firebase_token		:firebase_token
}










