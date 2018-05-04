module.exports = function(app, passport)
{
	var userApi = require('../controller/user.api.js');

	app.get('/', function(req, res) {
		res.render('index.ejs');
	});

	app.get('/signup', function(req, res) {
		res.render('signup.ejs', {});
	});

	app.get('/login', function(req, res) {
		res.render('login.ejs', {});
	});

	app.get('/auth/user/', isLoggedIn, function(req, res) {
		res.render('intermediate.ejs', { });
	});

	app.get('/auth/user/create', isLoggedIn, function(req, res) {
		res.render('createUser.ejs', {});
		console.log(req.user);
	});

	app.get('/auth/user/info', isLoggedIn, function(req, res) {
		res.render('askInfo.ejs', {});
	});

	app.get('/auth/user/sendMoney', isLoggedIn, function(req, res) {
		res.render('sendMoney.ejs', {});
	});

	app.get('/logout', function(req, res) {
			req.session.destroy(function() {
				res.clearCookie('connect.sid', { path: '/'}).status(200).redirect('/');
				// res.redirect('/');
			});
		});

	////////////////////////////////////////////////////////////////////////////////////

	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/auth/user/',
		failureRedirect: '/login',
		failureFlash: true
	}));

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/login',
		failureRedirect: '/signup',
		failureFlash: true
	}));

	/////////////////////////////////////////////////////////////////////////////////////


	app.post('/auth/user/create', isLoggedIn, userApi.create);

	app.post('/auth/user/info', isLoggedIn, userApi.sendInfo);

app.post('/auth/user/sendMoney', isLoggedIn, userApi.sendMoney);

	//////////////////////////////////////////////////////////////////////////////////////

};

function isLoggedIn(req, res, next)
{
	if(req.isAuthenticated())
	{
		return next();
	}else {
		res.redirect('/');
	}
}
