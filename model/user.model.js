var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = mongoose.Schema({

	local: {
		email: String,
		password: String,
		ac_type: String,
		balance: Number,
		branch_id: String,
		fname: String,
		lname: String,
		ac_no: String,
		createdAt: {
			type: Date,
			default: Date.now
	}
		},

	google: {

		name: String,
		email: String,
		token: String,
		id: String
	},

	// ac_type: String,
	// balance: Number,
	// branch_id: String,
	// fname: String,
	// lname: String,
	// ac_no: String,
	// createdAt: {
	// 		type: Date,
	// 		default: Date.now
	// }
});

UserSchema.methods.generateHash = function(password)
{
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

UserSchema.methods.validatePassword = function(password)
{
	return bcrypt.compareSync(password, this.local.password);
}

module.exports = mongoose.model('User', UserSchema);