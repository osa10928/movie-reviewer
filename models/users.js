const mongoose = require('mongoose');
const bcrypt = require('bcrypt')


const UserSchema = new mongoose.Schema({

	local            : {
		email        : { type:String, index: { unique:true } },
		password     : { type:String },
        picture      : String
	},
    facebook         : {
        id           : String,
        token        : String,
        name         : String,
        email        : String,
        picture        : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    admin            : Boolean,
    username         : {type: String, text: true},
    picture          : String
})


UserSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(12), null)
}

UserSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.local.password)
}


module.exports = mongoose.model('User', UserSchema);