var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');


var UserSchema = mongoose.Schema({

	auth: {
		local: {
			email: String,
			password: String,
			},
		google: {
			name: String,
			email: String,
			token: String,
			id: String,
		}
	},
  details :
		[{ac_no: String, ac_type: String, branch_id: String, balance: Number, fname: String, lname: String }],

	ac_tranc: [{
		ac_no: String,
		tranc_type: ['credit', 'debit'],
		initBal: Number,
		finalBal: Number
	}]

});


UserSchema.methods.generateHash = function(password)
{
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

UserSchema.methods.validatePassword = function(password)
{
	return bcrypt.compareSync(password, this.auth.local.password);
}

module.exports = mongoose.model('User', UserSchema);
