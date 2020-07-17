var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        username: {type: String, required: true, maxlength: 32},
        password: {type: String, required: true},
        isAdmin: {type: Boolean, required: true}
    }
);

// Export model
module.exports = mongoose.model('User', UserSchema);