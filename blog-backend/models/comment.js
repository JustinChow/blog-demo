var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var CommentSchema = new Schema(
    {
        author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        content: {type: String, required: true},
    },
    {
        timestamps: true
    }
);

// Virtual for relative publish timestamp
MessageSchema.virtual('publishDateRelative').get(function() {
    return moment(this.createdAt).fromNow();
});

// Virtual for formatted publish timestamp
MessageSchema.virtual('publishDateFormatted').get(function() {
    return moment(this.createdAt).format('llll');
});



// Export model
module.exports = mongoose.model('Comment', CommentSchema);