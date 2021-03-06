//The model is expected to return promises

const express = require('express');
const router = express.Router();
const authModel = require(__dirname + '/../models/auth.js');
const userModel = require(__dirname + '/../models/sequelize_db/schema.js'); //todo: change later to user.js
// const userModel = require(__dirname + '/../models/mongo_db/user.js');

router.route('/login')
	.get( (request, response) => {
		response.render('login');
	})
	.post( (request, response) => {
		// userModel.getUser(request.body.username)
		// .then( (user) => { 
		// 	return authModel.authenticate(request.body.password, user);
		// })
		// .then( (isAuthenticated) => {
		// 	if(isAuthenticated){
		// 		request.session.username = request.body.username;
		// 		response.redirect('/admin');
		// 	}
		// 	else{
		// 		return Promise.reject("isAuthenticated == false");
		// 	}
		// })
		// .catch( (whyNotAuthenticated) => {
		// 	console.log("Catch unauthenticated user: " + whyNotAuthenticated);
		// 	response.redirect('/auth/login');
		// });
		userModel.getUserVulnerable(request.body.username)
		// .then( (user) => { 
		// 	console.log('check user')
		// 	if(user[0] !== undefined){
		// 		console.log('user is done')
		// 		console.log(user)
		// 		response.send('done')
		// 	}
		// 	else{
		// 		response.send('no user')
		// 		return
		// 	}
		// })
		.then( (user) => { 
			if(user !== undefined){
				return authModel.authenticate(request.body.password, user);
			}
		})
		.then( (isAuthenticated) => {
			if(isAuthenticated){
				request.session.username = request.body.username;
				response.redirect('/admin');
			}
			else{
				return Promise.reject("isAuthenticated == false");
			}
		})
		.catch( (whyNotAuthenticated) => {
			console.log("Catch unauthenticated user: " + whyNotAuthenticated);
			response.redirect('/auth/login');
		});
	});

router.route('/logout')
	.get( (request, response) => {
		request.session.regenerate(function onComplete(error) {
			response.redirect('/admin');
		});
	});




module.exports = router;