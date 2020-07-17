var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var PostSchema = new Schema(
    {
        author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        title: {type: String, required: true},
        content: {type: String, required: true},
        post: {type: Schema.Types.ObjectId, ref: 'Post', required: true},
        isPublished: {type: Boolean, required: true},
        publishDate: {type: Date}
    },
    {
        timestamps: true
    }
);

// Virtual for relative publish timestamp
PostSchema.virtual('publishDateRelative').get(function() {
    return moment(this.publishDate).fromNow();
});

// Virtual for formatted publish timestamp
PostSchema.virtual('publishDateFormatted').get(function() {
    return moment(this.publishDate).format('llll');
});



// Export model
module.exports = mongoose.model('Post', PostSchema);