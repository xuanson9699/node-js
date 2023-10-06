import mongoose, { ObjectId, Schema } from "mongoose";

const Klass = mongoose.model(
  "Klass",
  new Schema({
    id: { type: ObjectId },
  })
);

export default Klass;
