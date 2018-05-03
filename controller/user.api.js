var User = require('../model/user.model.js');

exports.create = function(req, res)
{
	if(!req.body.ac_no || !req.body.fname || !req.body.ac_type)
	{
		return res.json({success: false, msg: 'Please enter all the details '});
	}

	User.findOne({'local.ac_no': req.body.ac_no}, function(err, user) {
		if(err)
		{
			console.log(err);
			res.json({success: false, msg: 'Error occured while adding details'})
		}
		if(user)
		{
			res.json({success: false, msg: 'A/C already exists'});
		}
		else {

			var newUser = req.user;
			newUser.local.ac_no = req.body.ac_no;
			newUser.local.ac_type = req.body.ac_type;
			newUser.local.balance = req.body.balance;
			newUser.local.fname = req.body.fname;
			newUser.local.lname = req.body.lname;
			newUser.local.branch_id = req.body.branch_id;

			newUser.save(function(err, data) {
				if(err)
				{
					res.json({success: false, msg: 'Error occured while saving'});
				}
				else {
					res.json({success: true, msg: 'A/C created successfully', data});
				}
			});
		}
	});
}

exports.getInfo = function(req, res)
{
	console.log(req.user);
	User.findOne({'local.ac_no': req.user.local.ac_no}, function(err, user) {
		if(err)
		{
			res.json({success: false, msg: 'Error occured'});
		}
		if(user)
		{
			var ac_no = req.user.local.ac_no;
			var ac_type = req.user.local.ac_type;
			var balance = req.user.local.balance;
			var branch_id = req.user.local.branch_id;
			var fname = req.user.local.fname;
			var lname = req.user.local.lname;

			res.render('info.ejs', { ac_no: ac_no, ac_type: ac_type, balance: balance, branch_id: branch_id, fname: fname, lname: lname});			
		}
	});
	
}