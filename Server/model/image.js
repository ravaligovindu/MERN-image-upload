
import mongoose  from "mongoose";
var Schema = mongoose.Schema;

const imageSchema = new Schema({
  image: String,
  user_id: Schema.ObjectId,
  date: { type: Date, default: Date.now },
});

const image = mongoose.model("image", imageSchema);
export default image;
