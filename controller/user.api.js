var User = require('../model/user.model.js');


exports.create = function(req, res)
{
	if(req.user)
	{
		email = req.user.local.email.toLowerCase();

		if(!req.body.ac_no || !req.body.fname || !req.body.branch_id)
		{
			res.json({success: false, msg: 'Please Enter All The Details '});
		} else {
			User.findOne({'local.email': email}, function(err, user) {
				if(err)
				{
					res.json({success: false, err})
				} else {

					var detail = {'ac_no': req.body.ac_no, 'ac_type': req.body.ac_type, 'fname': req.body.fname, 'lname': req.body.lname, 'branch_id': req.body.branch_id, 'balance': req.body.balance};

					//use the user a/c from passport signup
					var newUser = req.user;
					newUser.local.acc.details.push(detail);

					newUser.save(function(err, savedUser) {
						if(err)
						{
							res.json({success: false, err})
						} else {
							res.status(200).send('A/C created Successfully');
						}
					});
				}
			});
			};
		} else {
			res.json({success: false, msg: 'Error .... Please Login First'})
		}
	}

exports.sendInfo = function(req, res)
{
	console.log(req.body.ac_no);
	if(!req.body.ac_no)
	{
		res.json({success: false, msg: "Please enter the A/c no. you wish to retrive"});
	}	else {
		User.findOne({'local.email': req.user.local.email}, function(err, user) {
			if(err){
				res.json({success: false, err});
			}
			if(user)
			{
				var info = user.local.acc.details;
				for(i = 0; i < info.length; i++)
				{
					if(info[i].ac_no == req.body.ac_no)
					{
						//res.json(info[i]);
						res.render('sendInfo.ejs', { data: info[i] });
					}
				}
			}
		})
	}
		}

exports.sendMoney = function(req, res)
{
	if(!req.user.local.email || !req.body.sender_ac_no || !req.body.receiver_ac_no || !req.body.receiver_email)
	{
		res.json({success: false, msg: 'Please enter valid details'});
	} else {
		var amt = req.body.amt;
		User.findOne({'local.email': req.user.local.email}, function(err, user) {
			if(err)
			{
				res.json({sucess: false, err});
			}
			if(user)
			{
				var info = user.local.acc.details;
				for(i=0; i < info.length; i++)
				{
					if(info[i].ac_no == req.body.sender_ac_no)
					{
						var balance = parseInt(info[i].balance) - parseInt(amt);

						user.local.acc.details[i].balance = balance;

						user.save(function(err) {
							if(err)
							{
								console.log(err);
								//res.json({success: false, err});
							}
						});
						}
					}
				}
			});
		};

		User.findOne({'local.email': req.body.receiver_email}, function(err, user) {
			if(err)
			{
				console.log(err);
				// res.json({success: false, err});
			}
			if(user)
			{
				var info = user.local.acc.details;
				for(i=0; i < info.length; i++)
				{
					if(info[i].ac_no == req.body.receiver_ac_no)
					{
						var balance = parseInt(info[i].balance) + parseInt(amt)

						user.local.acc.details[i].balance = balance;

						user.save(function(err, savedUser) {
							if(err)
							{
								console.log(err);
								// res.json({success: false, err});
							} else {
								res.status(200).send(" Money Send Successfully ")
							}
						});
					}
				}
			}
		});
	}
