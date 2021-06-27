import { model, Schema } from "mongoose";

/**
 * This is the model saved in MongoDB
 */
const todoSchema = new Schema({
  _id: Schema.Types.ObjectId,
  id: String,
  status: String,
  description: String,
  createDate: Number,
  endDate: Number,
});

export default model("TodoSchema", todoSchema);
