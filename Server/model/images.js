var mongoose = require('mongoose');
var Schema = mongoose.Schema;

imageSchema = new Schema( {
	image: String,
	user_id: Schema.ObjectId,
	date : { type : Date, default: Date.now }
}),
image = mongoose.model('image', imageSchema);

module.exports = image;